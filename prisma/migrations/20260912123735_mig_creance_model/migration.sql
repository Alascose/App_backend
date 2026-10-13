/*
  Warnings:

  - You are about to drop the column `clientId` on the `Creance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Creance" DROP CONSTRAINT "Creance_clientId_fkey";

-- AlterTable
ALTER TABLE "Creance" DROP COLUMN "clientId";
