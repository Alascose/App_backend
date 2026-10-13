/*
  Warnings:

  - You are about to drop the column `dateDette` on the `Dette` table. All the data in the column will be lost.
  - You are about to drop the column `montantTotal` on the `Dette` table. All the data in the column will be lost.
  - You are about to drop the column `adresse` on the `Fournisseur` table. All the data in the column will be lost.
  - You are about to drop the column `fournisseurDate` on the `Fournisseur` table. All the data in the column will be lost.
  - Added the required column `montant` to the `Dette` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dette" DROP COLUMN "dateDette",
DROP COLUMN "montantTotal",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "montant" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Fournisseur" DROP COLUMN "adresse",
DROP COLUMN "fournisseurDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL;
