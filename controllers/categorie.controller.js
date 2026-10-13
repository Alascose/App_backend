import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getCategorie = async (req, res) => {
  try {
    const categories = await prisma.categorie.findMany({
      include: { produit: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur GET categories", error: error.message });
  }
};

//Creer une categorie POST
export const createCategorie = async (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    return res
      .status(400)
      .json({ message: "Tous les champs doivent être remplir!" });
  }
  try {
    const categorie = await prisma.categorie.create({
      data: { nom },
    });
    const completeCategorie = await prisma.categorie.findUnique({
      where: { id: categorie.id },
      include: { produit: true },
    });
    res.status(201).json(completeCategorie);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur POST categorie", error: error.message });
  }
};
