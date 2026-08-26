/*
  Warnings:

  - You are about to drop the column `quantiteProduit` on the `Produit` table. All the data in the column will be lost.
  - Added the required column `quantiteStock` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "quantiteProduit",
ADD COLUMN     "quantiteStock" INTEGER NOT NULL;
