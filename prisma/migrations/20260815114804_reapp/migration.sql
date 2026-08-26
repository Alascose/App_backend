-- CreateTable
CREATE TABLE "Reapprovisionnement" (
    "id" SERIAL NOT NULL,
    "produitId" INTEGER NOT NULL,
    "quantiteAjoute" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reapprovisionnement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reapprovisionnement" ADD CONSTRAINT "Reapprovisionnement_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
