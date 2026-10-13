import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getVente = async (req, res) => {
  try {
    const ventes = await prisma.vente.findMany({
      include: { produit: true, client: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(ventes);
  } catch (error) {
    res.status(500).json({ message: "Erreur GET vente", error: error.message });
  }
};
// Creer une vente POST
export const createVente = async (req, res) => {
  const {
    clientId,
    produitId,
    quantite,
    quantiteStock,
    prixProduit,
    montantTotal,
  } = req.body;
  if (!clientId || !produitId || !quantite || !prixProduit || !montantTotal) {
    return res
      .status(400)
      .json({ message: "Tous les champs doivent être remplir" });
  }
  try {
    const produit = await prisma.produit.findUnique({
      where: { id: Number(produitId) },
    });
    if (!produit) {
      return res.status(404).json({ message: "Produit introuvable!" });
    }
    if (produit.quantiteStock < Number(quantite)) {
      return res.status(400).json({
        message: `Quantité insuffisante en stock: ${produit.quantiteStock} en stock`,
      });
    }
    const client = await prisma.client.findUnique({
      where: { id: Number(clientId) },
    });
    if (!client) {
      return res.status(404).json({ message: "Client introuvable!" });
    }
    const vente = await prisma.vente.create({
      data: {
        clientId: Number(clientId),
        produitId: Number(produitId),
        quantite: Number(quantite),
        prixProduit: Number(prixProduit),
        montantTotal: Number(montantTotal),
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
    const valideVente = await prisma.vente.findUnique({
      where: { id: vente.id },
      include: { client: true, produit: true },
    });
    res.status(201).json(valideVente);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Echec de realisation de vente", error: error.message });
  }
};
// Modifier une vente PUT
export const EditeVente = async (req, res) => {
  const { clientId, produitId, quantite, prixProduit, montantTotal } = req.body;
  const id = parseInt(req.params.id);
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
    const vente = await prisma.vente.findUnique({
      where: { id },
    });
    if (!vente) {
      return res.status(404).json({ message: "Vente introuvable" });
    }
    const updateVente = await prisma.vente.update({
      where: { id },
      data: {
        clientId: Number(clientId),
        produitId: Number(produitId),
        quantite: Number(quantite),
        prixProduit: Number(prixProduit),
        montantTotal: Number(montantTotal),
      },
    });
    const completeUpdate = await prisma.vente.findUnique({
      where: { id: updateVente.id },
      include: { client: true, produit: true },
    });
    res.status(201).json(completeUpdate);
  } catch (error) {
    res.status(500).json({ message: "Error PUT vente", error: error.message });
  }
};
//Supprimer une vente DELETE
export const deleteVente = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const vente = await prisma.vente.findUnique({
      where: { id },
    });
    if (!vente) {
      return res.status(404).json({ message: "Vente introuvable" });
    }
    await prisma.produit.update({
      where: { id: vente.produitId },
      data: {
        quantiteStock: {
          increment: vente.quantite,
        },
      },
    });
    const venteDelete = await prisma.vente.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "Vente supprimer avec succès", venteDelete });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur DELETE BACK vente", error: error.message });
  }
};
