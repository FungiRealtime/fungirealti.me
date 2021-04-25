/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `License` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeCustomerId` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "stripeCustomerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_stripeCustomerId_unique" ON "License"("stripeCustomerId");

-- AddForeignKey
ALTER TABLE "License" ADD FOREIGN KEY ("stripeCustomerId") REFERENCES "StripeCustomer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
