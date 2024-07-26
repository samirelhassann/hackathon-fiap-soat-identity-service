/*
  Warnings:

  - Changed the type of `availableFrom` on the `doctor_availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `availableTo` on the `doctor_availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "doctor_availability" DROP COLUMN "availableFrom",
ADD COLUMN     "availableFrom" INTEGER NOT NULL,
DROP COLUMN "availableTo",
ADD COLUMN     "availableTo" INTEGER NOT NULL;
