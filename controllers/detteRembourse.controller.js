import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getDetteRembourse = async (req, res) => {
  try {
    const detteRembourse = await prisma.detteRembourse.findMany({
      orderBy: { createdAt: "desc" },
      include: { fournisseur: true, produit: true },
    });
    res.status(201).json(detteRembourse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur GET dette rembourse", error: error.message });
  }
};
// Create detteRembourse
export const createDetteRembourse = async (req, res) => {
  // On recupère l'id de la dette a modifié
  const detteId = Number(req.body.detteId);
  if (!Number.isInteger(detteId) || detteId <= 0) {
    return res.status(400).json({ message: "Id invalide" });
  }
  const montantRemboursé = Number(req.body.montantRembourse);
  if (!Number.isFinite(montantRemboursé) || montantRemboursé <= 0) {
    return res.status(400).json({ message: "Montant de solde non valable" });
  }
  try {
    const resultat = await prisma.$transaction(async (tx) => {
      // On recupère la dette dans la base de donnée
      const dette = await tx.dette.findUnique({
        where: { id: detteId },
      });
      if (!dette) {
        const erreur = new Error("Dette introuvable");
        erreur.statusCode = 404;
        throw erreur;
      }
      const montantTotaleDette = dette.montant;
      const montantDejaRembourse = dette.montantRembourse ?? 0;
      const montantRestantAvantRemboursement =
        dette.montantReste ?? montantTotaleDette - montantDejaRembourse;
      if (montantRemboursé > montantRestantAvantRemboursement) {
        const erreur = new Error(
          `Le montant rembourssé depasse celui restant, montant restant: ${montantRestantAvantRemboursement} CFA`,
        );
        erreur.statusCode = 400;
        throw erreur;
      }
      const nouveauMontantRembourse = montantDejaRembourse + montantRemboursé;
      const nouveauMontantReste = Math.max(
        0,
        montantRestantAvantRemboursement - montantRemboursé,
      );
      const status =
        nouveauMontantReste === 0 ? "Remboursée" : "Partiellement remboursée";
      const detteRembourse = await tx.detteRembourse.create({
        data: {
          detteId: dette.id,
          fournisseurId: dette.fournisseurId,
          produitId: dette.produitId,
          prixUnitaire: dette.prixUnitaire,
          quantite: dette.quantite,
          montantRembourse: Number(nouveauMontantRembourse),
          montantReste: Number(nouveauMontantReste),
        },
      });
      // On met à jour la dette principale
      const detteMisAjour = await tx.dette.update({
        where: { id: detteId },
        data: {
          montant: Number(montantTotaleDette),
          montantRembourse: Number(nouveauMontantRembourse),
          montantReste: Number(nouveauMontantReste),
          statusDette: status,
        },
      });
      return { detteRembourse, detteMisAjour };
    });
    return res.status(201).json({
      message: "Solde de dette remboursé avec succès",
      detteRembourse: resultat.detteRembourse,
      detteMisAjour: resultat.detteMisAjour,
    });
  } catch (error) {
    const statusCode = error.statusCode ?? 500;
    return res.status(statusCode).json({
      message:
        statusCode === 500 ? "Erreur de rembousement de dette" : error.message,
      ...(statusCode === 500 ? { error: error.message } : {}),
    });
  }
};
