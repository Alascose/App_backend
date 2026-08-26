-- CreateTable
CREATE TABLE "Vente" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "produitId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "montantTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Vente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
