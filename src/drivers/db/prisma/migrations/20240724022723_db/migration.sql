/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "locations_userId_key" ON "locations"("userId");
