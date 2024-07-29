/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_token_key" ON "OnRampTransaction"("token");
