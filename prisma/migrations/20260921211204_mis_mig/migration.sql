/*
  Warnings:

  - You are about to drop the column `status` on the `Creance` table. All the data in the column will be lost.
  - Added the required column `statusCreance` to the `Creance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusDette` to the `Dette` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Creance" DROP COLUMN "status",
ADD COLUMN     "statusCreance" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Dette" ADD COLUMN     "statusDette" TEXT NOT NULL;
