/*
  Warnings:

  - Added the required column `statusDette` to the `DetteRembourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DetteRembourse" ADD COLUMN     "statusDette" TEXT NOT NULL;
