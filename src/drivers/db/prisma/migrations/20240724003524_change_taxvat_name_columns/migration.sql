/*
  Warnings:

  - You are about to drop the column `taxvat` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "taxvat",
ADD COLUMN     "taxVat" TEXT;
