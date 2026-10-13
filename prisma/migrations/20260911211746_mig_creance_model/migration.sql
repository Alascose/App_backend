-- CreateTable
CREATE TABLE "Creance" (
    "id" SERIAL NOT NULL,
    "produitId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "nomCreancier" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "proffession" TEXT NOT NULL,
    "adresse" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Creance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Creance" ADD CONSTRAINT "Creance_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creance" ADD CONSTRAINT "Creance_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
