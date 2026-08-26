import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getVente = async (req, res) => {
  try {
    const ventes = await prisma.vente.findMany({
      include: { produit: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(ventes);
  } catch (error) {
    res.status(500).json({ message: "Erreur GET vente", error: error.message });
  }
};
// Crrer une vente POST
export const createVente = async (req, res) => {
  const { clientName, produitId, quantite, montantTotal } = req.body;
  if (!clientName || !produitId || !quantite || !montantTotal) {
    return res
      .status(400)
      .json({ message: "Tous les champs doivent être remplir" });
  }
  try {
    const produit = await prisma.produit.findUnique({
      where: { id: Number(produitId) },
    });
    if (!produitId) {
      return res.status(404).json({ message: "Produit introuvable!" });
    }
    const ventes = await prisma.vente.create({
      data: {
        clientName,
        produitId: Number(produitId),
        quantite: Number(quantite),
        montantTotal: Number(montantTotal),
      },
    });
    res.status(201).json({ message: "vente effectuée avec succès!", ventes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Echec de realisation de vente", error: error.message });
  }
};
