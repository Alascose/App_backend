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
    res.status(500).json({ error: "Erreur GET produits" });
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
    const produits = await prisma.produit.create({
      data: {
        nomProduit,
        prixProduit: Number(prixProduit),
        quantiteStock: Number(quantiteStock),
        categorieId: Number(categorieId),
      },
    });
    res.json(produits);
  } catch (error) {
    res.status(500).json({ error: "Erreur POST produit" });
  }
};
