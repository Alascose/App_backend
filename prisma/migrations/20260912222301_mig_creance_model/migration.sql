/*
  Warnings:

  - You are about to drop the column `nomCreancier` on the `Creance` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Creance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creance" DROP COLUMN "nomCreancier",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Creance" ADD CONSTRAINT "Creance_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
