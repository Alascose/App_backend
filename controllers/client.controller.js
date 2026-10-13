import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getClient = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur GET client", error: error.message });
  }
};

// Creer les clients POST
export const createClient = async (req, res) => {
  const { clientName, clientTel, clientEmail } = req.body;
  if (!clientName) {
    return res.status(400).json({ message: "Nom de client obligatoire!" });
  }
  try {
    const client = await prisma.client.create({
      data: {
        clientName: clientName,
        clientTel: clientTel,
        clientEmail: clientEmail,
      },
    });
    const completeClient = await prisma.client.findUnique({
      where: { id: client.id },
    });
    res.status(201).json(completeClient);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur d'ajout de client", error: error.message });
  }
};
