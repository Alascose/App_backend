/*
  Warnings:

  - Added the required column `montantRembourse` to the `DetteRembourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetteRembourse" ADD COLUMN     "montantRembourse" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "montantReste" DOUBLE PRECISION;
