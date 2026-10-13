/*
  Warnings:

  - You are about to drop the column `adresse` on the `Dette` table. All the data in the column will be lost.
  - You are about to drop the column `creanceDate` on the `Dette` table. All the data in the column will be lost.
  - You are about to drop the column `nomFournisseur` on the `Dette` table. All the data in the column will be lost.
  - You are about to drop the column `siege` on the `Dette` table. All the data in the column will be lost.
  - You are about to drop the column `telephone` on the `Dette` table. All the data in the column will be lost.
  - Added the required column `fournisseurId` to the `Dette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantTotal` to the `Dette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixUnitaire` to the `Dette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantite` to the `Dette` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dette" DROP COLUMN "adresse",
DROP COLUMN "creanceDate",
DROP COLUMN "nomFournisseur",
DROP COLUMN "siege",
DROP COLUMN "telephone",
ADD COLUMN     "dateDette" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fournisseurId" INTEGER NOT NULL,
ADD COLUMN     "montantTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "prixUnitaire" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantite" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "nomFournisseur" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "siege" TEXT,
    "fournisseurDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Dette" ADD CONSTRAINT "Dette_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
