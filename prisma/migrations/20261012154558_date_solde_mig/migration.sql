/*
  Warnings:

  - Added the required column `dateSolde` to the `Creance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creance" ADD COLUMN     "dateSolde" TIMESTAMP(3) NOT NULL;
