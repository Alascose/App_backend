/*
  Warnings:

  - You are about to drop the column `montant` on the `DetteRembourse` table. All the data in the column will be lost.
  - Added the required column `montantDette` to the `DetteRembourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetteRembourse" DROP COLUMN "montant",
ADD COLUMN     "montantDette" DOUBLE PRECISION NOT NULL;
