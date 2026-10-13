/*
  Warnings:

  - Added the required column `clientName` to the `Vente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vente" ADD COLUMN     "clientName" TEXT NOT NULL;
