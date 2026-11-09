import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getDette = async (req, res) => {
  try {
    const dettes = await prisma.dette.findMany({
      include: { produit: true, fournisseur: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(dettes);
  } catch (error) {
    res.status(500).json({ message: "Erreur GET dette", error: error.message });
  }
};

export const createDette = async (req, res) => {
  const {
    fournisseurId,
    produitId,
    quantite,
    prixUnitaire,
    montant,
    montantRembourse,
    montantReste,
    statusDette = "En cous",
    dateRembourse,
  } = req.body;
  if (
    !fournisseurId ||
    !produitId ||
    !quantite ||
    !prixUnitaire ||
    !montant ||
    !statusDette ||
    !dateRembourse
  ) {
    return res.status(401).json({ message: "Quelques champs obligatoire." });
  }

  try {
    const produit = await prisma.produit.findUnique({
      where: { id: Number(produitId) },
    });
    if (!produit) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    const fournisseur = await prisma.fournisseur.findUnique({
      where: { id: Number(fournisseurId) },
    });
    if (!fournisseur) {
      return res.status(401).json({ message: "Fournisseur introuvable" });
    }
    const dette = await prisma.dette.create({
      data: {
        fournisseurId: Number(fournisseurId),
        produitId: Number(produitId),
        quantite: Number(quantite),
        prixUnitaire: Number(prixUnitaire),
        montant: montant,
        montantRembourse: montantRembourse ? Number(montantRembourse) : null,
        montantReste: montantReste ? Number(montantReste) : Number(montant),
        statusDette: "En cour",
        dateRembourse: new Date(dateRembourse),
      },
    });
    await prisma.produit.update({
      where: { id: Number(produitId) },
      data: {
        quantiteStock: {
          increment: Number(quantite),
        },
      },
    });
    const completeDette = await prisma.dette.findUnique({
      where: { id: dette.id },
      include: { produit: true, fournisseur: true },
    });
    res.status(201).json(completeDette);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur POST dette", error: error.message });
  }
};

export const editeDette = async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    fournisseurId,
    produitId,
    prixUnitaire,
    quantite,
    montant,
    statusDette = "En cour",
    dateRembourse,
  } = req.body;
  try {
    const updateDette = await prisma.dette.update({
      where: { id },
      data: {
        fournisseurId: Number(fournisseurId),
        produitId: Number(produitId),
        prixUnitaire: Number(prixUnitaire),
        quantite: Number(quantite),
        montant,
        statusDette: "En cour",
        dateRembourse: new Date(dateRembourse),
      },
    });
    const completeDetteEdite = await prisma.dette.findUnique({
      where: { id: updateDette.id },
      include: { fournisseur: true, produit: true },
    });
    res.status(200).json(completeDetteEdite);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur editeDette", error: error.message });
  }
};
// Supprimer une dette DELETE
export const deleteDette = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const dette = await prisma.dette.findUnique({
      where: { id },
    });
    if (!dette) {
      return res.status(404).json({ message: "Dette introuvable" });
    }
    await prisma.produit.update({
      where: { id: dette.produitId },
      data: {
        quantiteStock: {
          increment: dette.quantite,
        },
      },
    });
    const detteDelete = await prisma.dette.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "Dette supprimer avec succes", detteDelete });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ereeur DELETE back dette", error: error.message });
  }
};
