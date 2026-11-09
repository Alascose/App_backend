/*
  Warnings:

  - You are about to drop the column `prixProduit` on the `CreanceSolde` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CreanceSolde" DROP COLUMN "prixProduit",
ALTER COLUMN "montantTotal" DROP NOT NULL,
ALTER COLUMN "montantRestant" DROP NOT NULL;
