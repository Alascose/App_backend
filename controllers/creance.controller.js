import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getCreance = async (req, res) => {
  try {
    const creance = await prisma.creance.findMany({
      include: { produit: true, client: true },
      orderBy: { createdAt: "desc" },
    });
    return res.status(201).json(creance);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur GET creances", error: error.message });
  }
};

// Envoyer les creances POST
export const createCreance = async (req, res) => {
  const {
    clientId,
    produitId,
    prixProduit,
    quantite,
    profession,
    montantTotal,
    montantVerse,
    montantRestant,
    statusCreance = "En cour",
    dateSolde,
  } = req.body;
  if (
    !clientId ||
    !produitId ||
    !prixProduit ||
    !quantite ||
    !montantTotal ||
    !statusCreance ||
    !dateSolde
  ) {
    return res.status(400).json({
      message: "Tous les champs doivent être remplir",
    });
  }
  try {
    const produit = await prisma.produit.findUnique({
      where: { id: Number(produitId) },
    });
    if (!produit) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    if (produit.quantiteStock < Number(quantite)) {
      return res
        .status(400)
        .json({ message: "Quantité insuffisante en stock" });
    }
    const client = await prisma.client.findUnique({
      where: { id: Number(clientId) },
    });
    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }
    const creance = await prisma.creance.create({
      data: {
        clientId: Number(clientId),
        produitId: Number(produitId),
        prixProduit: Number(prixProduit),
        quantite: Number(quantite),
        profession,
        montantTotal: Number(montantTotal),
        montantVerse: montantVerse ? Number(montantVerse) : 0,
        montantRestant: montantRestant
          ? Number(montantRestant)
          : Number(montantTotal),
        statusCreance: "En cour",
        dateSolde: new Date(dateSolde),
      },
    });
    await prisma.produit.update({
      where: { id: Number(produitId) },
      data: {
        quantiteStock: {
          decrement: Number(quantite),
        },
      },
    });
    const completeCreance = await prisma.creance.findUnique({
      where: { id: creance.id },
      include: { produit: true, client: true },
    });
    res.status(201).json(completeCreance);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur POST creance", error: error.message });
  }
};
// Modifier une creance PUT
export const editeCreance = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    clientId,
    produitId,
    prixProduit,
    quantite,
    profession,
    montantTotal,
    montantVerse,
    montantRestant,
    statusCreance = "En cour",
    dateSolde,
  } = req.body;
  try {
    const client = await prisma.client.findUnique({
      where: { id: Number(clientId) },
    });
    if (!client) {
      return res.status(404).json({ message: "Client introuvable" });
    }
    const produit = await prisma.produit.findUnique({
      where: { id: Number(produitId) },
    });
    if (!produit) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    const updateCreance = await prisma.creance.update({
      where: { id },
      data: {
        clientId: Number(clientId),
        produitId: Number(produitId),
        prixProduit: Number(prixProduit),
        quantite: Number(quantite),
        profession,
        montantTotal: Number(montantTotal),
        montantVerse: montantVerse ? Number(montantVerse) : 0,
        montantRestant: montantRestant ? Number(montantRestant) : 0,
        statusCreance: "En cour",
        dateSolde: new Date(dateSolde),
      },
    });
    const completeUpdate = await prisma.creance.findUnique({
      where: { id: updateCreance.id },
      include: { client: true, produit: true },
    });
    res.status(200).json(completeUpdate);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur update creance", error: error.message });
  }
};
// Supprimer la creance DELETE
export const deleteCreance = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const creance = await prisma.creance.findUnique({
      where: { id },
    });
    if (!creance) {
      return res.status(404).json({ message: "Creance introuvable" });
    }
    await prisma.produit.update({
      where: { id: creance.produitId },
      data: {
        quantiteStock: {
          increment: creance.quantite,
        },
      },
    });
    const creanceDelete = await prisma.creance.delete({
      where: { id },
    });
    return res.status(200).json({
      message: "Creance supprimer et stock reatabli avec succès!",
      creanceDelete,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur DELETE BACK creance", error: error.message });
  }
};
