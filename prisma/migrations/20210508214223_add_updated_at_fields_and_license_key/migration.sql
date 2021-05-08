/*
  Warnings:

  - You are about to drop the column `githubUserId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StripeCustomer" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "licenseKey" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "githubUserId",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
