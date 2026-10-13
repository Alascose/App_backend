/*
  Warnings:

  - You are about to drop the column `emailClient` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `numeroClient` on the `Client` table. All the data in the column will be lost.
  - Added the required column `clientEmail` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientTel` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "emailClient",
DROP COLUMN "numeroClient",
ADD COLUMN     "clientEmail" TEXT NOT NULL,
ADD COLUMN     "clientTel" TEXT NOT NULL;
