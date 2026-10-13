/*
  Warnings:

  - You are about to drop the column `adresse` on the `Creance` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Creance` table. All the data in the column will be lost.
  - Added the required column `clientEmail` to the `Creance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientTel` to the `Creance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantTotal` to the `Creance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prixProduit` to the `Creance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantite` to the `Creance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creance" DROP COLUMN "adresse",
DROP COLUMN "contact",
ADD COLUMN     "clientEmail" TEXT NOT NULL,
ADD COLUMN     "clientTel" TEXT NOT NULL,
ADD COLUMN     "montantTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "prixProduit" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantite" INTEGER NOT NULL;
