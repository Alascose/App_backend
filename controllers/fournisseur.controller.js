import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getFournisseur = async (req, res) => {
  try {
    const fournisseurs = await prisma.fournisseur.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(fournisseurs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur GET fournisseurs", error: error.message });
  }
};

export const createFournisseur = async (req, res) => {
  const { nomFournisseur, contact, email, siege } = req.body;
  if (!nomFournisseur || !contact || !email) {
    return res
      .status(400)
      .json({ message: "Les champs doivent être remplir!" });
  }
  try {
    const fournisseur = await prisma.fournisseur.create({
      data: { nomFournisseur, contact, email, siege },
    });
    const completeFournisseur = await prisma.fournisseur.findUnique({
      where: { id: fournisseur.id },
    });
    res.status(201).json(completeFournisseur);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur POST fournisseur", error: error.message });
  }
};
