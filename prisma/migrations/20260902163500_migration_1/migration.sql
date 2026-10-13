/*
  Warnings:

  - You are about to drop the column `clientName` on the `Vente` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Vente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vente" DROP COLUMN "clientName",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Vente" ADD CONSTRAINT "Vente_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
