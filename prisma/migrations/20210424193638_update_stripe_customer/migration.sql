/*
  Warnings:

  - You are about to drop the column `customer` on the `StripeCustomer` table. All the data in the column will be lost.
  - Added the required column `amount` to the `StripeCustomer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentIntentId` to the `StripeCustomer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StripeCustomer" DROP COLUMN "customer",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paymentIntentId" TEXT NOT NULL;
