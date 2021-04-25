/*
  Warnings:

  - You are about to drop the `License` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "License" DROP CONSTRAINT "License_userId_fkey";

-- DropTable
DROP TABLE "License";
