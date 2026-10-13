-- CreateTable
CREATE TABLE "Dette" (
    "id" SERIAL NOT NULL,
    "nomFournisseur" TEXT NOT NULL,
    "produitId" INTEGER NOT NULL,
    "telephone" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "siege" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dette_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dette" ADD CONSTRAINT "Dette_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
