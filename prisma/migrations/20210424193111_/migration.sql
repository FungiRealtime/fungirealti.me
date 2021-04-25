/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `License` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `StripeCustomer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `StripeCustomer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "License" DROP CONSTRAINT "License_stripeCustomerId_fkey";

-- DropIndex
DROP INDEX "License_stripeCustomerId_unique";

-- AlterTable
ALTER TABLE "License" DROP COLUMN "stripeCustomerId";

-- AlterTable
ALTER TABLE "StripeCustomer" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_userId_unique" ON "StripeCustomer"("userId");

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
