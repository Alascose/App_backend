import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const createReapprovisionnement = async (req, res) => {
  const { produitId, quantite } = req.body;
  if (!produitId || !quantite || quantite <= 0) {
    return res
      .status(400)
      .json({ message: "Produit et quantité necessaire obligatoire!" });
  }
  try {
    const produit = await prisma.produit.findUnique({
      where: { id: Number(produitId) },
    });
    if (!produit) {
      return res.status(404).json({ message: "Produit introuvable" });
    }
    const reapprovisionnement = await prisma.reapprovisionnement.create({
      data: {
        produitId: Number(produitId),
        quantite: Number(quantite),
      },
    });
    const produitMisAjour = await prisma.produit.update({
      where: { id: Number(produitId) },
      data: {
        quantiteStock: {
          increment: Number(quantite),
        },
      },
    });
    res.status(201).json({
      message: "Reapprovisionnement effectué avec succès!",
      reapprovisionnement,
      produit: produitMisAjour,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur de reapprovisionnement!",
      error: error.message,
    });
  }
};
