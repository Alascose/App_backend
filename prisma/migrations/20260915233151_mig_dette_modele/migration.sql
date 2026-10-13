/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Dette` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dette" DROP COLUMN "createdAt",
ADD COLUMN     "creanceDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
