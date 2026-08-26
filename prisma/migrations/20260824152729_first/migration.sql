/*
  Warnings:

  - You are about to drop the column `quantiteAjoute` on the `Reapprovisionnement` table. All the data in the column will be lost.
  - Added the required column `quantite` to the `Reapprovisionnement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reapprovisionnement" DROP COLUMN "quantiteAjoute",
ADD COLUMN     "quantite" INTEGER NOT NULL;
