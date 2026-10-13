/*
  Warnings:

  - Added the required column `prixProduit` to the `Vente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vente" ADD COLUMN     "prixProduit" DOUBLE PRECISION NOT NULL;
