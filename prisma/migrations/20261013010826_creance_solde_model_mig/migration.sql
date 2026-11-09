-- CreateTable
CREATE TABLE "CreanceSolde" (
    "id" SERIAL NOT NULL,
    "creanceId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prixProduit" DOUBLE PRECISION NOT NULL,
    "montantTotal" DOUBLE PRECISION NOT NULL,
    "satatusCreance" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreanceSolde_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreanceSolde" ADD CONSTRAINT "CreanceSolde_creanceId_fkey" FOREIGN KEY ("creanceId") REFERENCES "Creance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreanceSolde" ADD CONSTRAINT "CreanceSolde_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreanceSolde" ADD CONSTRAINT "CreanceSolde_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
