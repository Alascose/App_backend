/*
  Warnings:

  - Added the required column `creanceId` to the `CreanceSolde` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreanceSolde" ADD COLUMN     "creanceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CreanceSolde" ADD CONSTRAINT "CreanceSolde_creanceId_fkey" FOREIGN KEY ("creanceId") REFERENCES "Creance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
