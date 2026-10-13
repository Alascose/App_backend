/*
  Warnings:

  - You are about to drop the column `proffession` on the `Creance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Creance" DROP COLUMN "proffession",
ADD COLUMN     "profession" TEXT;
