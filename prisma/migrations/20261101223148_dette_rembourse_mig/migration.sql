-- CreateTable
CREATE TABLE "DetteRembourse" (
    "id" SERIAL NOT NULL,
    "detteId" INTEGER NOT NULL,
    "fournisseurId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DetteRembourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DetteRembourse" ADD CONSTRAINT "DetteRembourse_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetteRembourse" ADD CONSTRAINT "DetteRembourse_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetteRembourse" ADD CONSTRAINT "DetteRembourse_detteId_fkey" FOREIGN KEY ("detteId") REFERENCES "Dette"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
