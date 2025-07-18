/*
  Warnings:

  - A unique constraint covering the columns `[venueId,number]` on the table `DiningTable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DiningTable_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "DiningTable_venueId_number_key" ON "DiningTable"("venueId", "number");
