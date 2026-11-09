/*
  Warnings:

  - You are about to drop the column `creanceId` on the `CreanceSolde` table. All the data in the column will be lost.
  - Added the required column `montantRestant` to the `CreanceSolde` table without a default value. This is not possible if the table is not empty.
  - Added the required column `montantVerse` to the `CreanceSolde` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CreanceSolde" DROP CONSTRAINT "CreanceSolde_creanceId_fkey";

-- AlterTable
ALTER TABLE "CreanceSolde" DROP COLUMN "creanceId",
ADD COLUMN     "montantRestant" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "montantVerse" DOUBLE PRECISION NOT NULL;
