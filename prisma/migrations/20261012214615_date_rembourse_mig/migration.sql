/*
  Warnings:

  - Added the required column `dateRembourse` to the `Dette` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dette" ADD COLUMN     "dateRembourse" TIMESTAMP(3) NOT NULL;
