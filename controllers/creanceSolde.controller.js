import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getCreanceSolde = async (req, res) => {
  try {
    const creanceSolde = await prisma.creanceSolde.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true, produit: true },
    });
    res.json(creanceSolde);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur get creanceSolde", error: error.message });
  }
};
// Creer une creance POST
export const createCreanceSolde = async (req, res) => {
  //On recupère l'id de la creance selctionner
  const creanceId = Number(req.body.creanceId);
  if (!Number.isInteger(creanceId) || creanceId <= 0) {
    return res.status(400).json({ message: "Id invalide" });
  }
  //On recupère ensuite le montant versé par le client
  const montantPaiement = Number(req.body.montantVerse);
  if (!Number.isFinite(montantPaiement) || montantPaiement <= 0) {
    return res.status(400).json({ message: "Montant de paiement invalide" });
  }
  try {
    const resultat = await prisma.$transaction(async (tx) => {
      //On selctionne la creance qu'on veut solder dans la base de donnée
      const creance = await tx.creance.findUnique({
        where: { id: creanceId },
      });
      if (!creance) {
        const erreur = new Error("Creance introuvable");
        erreur.statusCode = 404;
        throw erreur;
      }
      const montantTotalCreance = creance.montantTotal;
      const montantDejaVerse = creance.montantVerse ?? 0;
      const montantRestantAvantPaiement =
        creance.montantRestant ?? montantTotalCreance - montantDejaVerse;
      if (montantPaiement > montantRestantAvantPaiement) {
        const erreur = new Error(
          "Le montant de payement depasse celui restant",
        );
        erreur.statusCode = 400;
        throw erreur;
      }
      const nouveauMontantVerse = montantDejaVerse + montantPaiement;
      const nouveauMontantRestant = Math.max(
        0,
        montantRestantAvantPaiement - montantPaiement,
      );
      const status =
        nouveauMontantRestant === 0 ? "Soldé" : "Partiellement soldé";
      const creanceSolde = await tx.creanceSolde.create({
        data: {
          creanceId: creance.id,
          clientId: creance.clientId,
          produitId: creance.produitId,
          quantite: creance.quantite,
          montantVerse: nouveauMontantVerse,
          montantRestant: nouveauMontantRestant,
        },
      });
      const creanceMisAjour = await tx.creance.update({
        where: { id: creanceId },
        data: {
          montantTotal: montantTotalCreance,
          montantVerse: nouveauMontantVerse,
          montantRestant: nouveauMontantRestant,
          statusCreance: status,
        },
        include: { client: true, produit: true },
      });
      return { creanceSolde, creanceMisAjour };
    });
    return res.status(201).json({
      message: "Creance soldée avec succès!",
      creanceSolde: resultat.creanceSolde,
      creanceMisAjour: resultat.creanceMisAjour,
    });
  } catch (error) {
    const statusCode = error.statusCode ?? 500;
    return res.status(statusCode).json({
      message:
        statusCode === 500 ? "Erreur de payement de la creance" : error.message,
      ...(statusCode === 500 ? { error: error.message } : {}),
    });
  }
};
