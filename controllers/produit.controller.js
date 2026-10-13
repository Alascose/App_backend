import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getProduit = async (req, res) => {
  try {
    const produits = await prisma.produit.findMany({
      include: { categorie: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(produits);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur GET produits", error: error.message });
  }
};

//Creer un produit POST
export const createProduit = async (req, res) => {
  const { nomProduit, prixProduit, quantiteStock, categorieId } = req.body;
  if (!nomProduit || !prixProduit || !quantiteStock || !categorieId) {
    return res
      .status(400)
      .json({ message: "Tous les champs doivent être remplir." });
  }
  try {
    const produit = await prisma.produit.create({
      data: {
        nomProduit,
        prixProduit: Number(prixProduit),
        quantiteStock: Number(quantiteStock),
        categorieId: Number(categorieId),
      },
    });
    const completeProduit = await prisma.produit.findUnique({
      where: { id: produit.id },
      include: { categorie: true },
    });
    res.status(201).json(completeProduit);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur POST produit", error: error.message });
  }
};
