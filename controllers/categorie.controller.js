import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getCategorie = async (req, res) => {
  try {
    const categories = await prisma.categorie.findMany({
      include: { produits: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Erreur GET categories" });
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
    const categories = await prisma.categorie.create({
      data: { nom },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ err: "Erreur POST categorie" });
  }
};
