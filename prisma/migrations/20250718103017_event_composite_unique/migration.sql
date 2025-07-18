/*
  Warnings:

  - A unique constraint covering the columns `[typeId,date]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Event_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "Event_typeId_date_key" ON "Event"("typeId", "date");
