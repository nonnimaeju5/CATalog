/*
  Warnings:

  - You are about to drop the column `postedAboutId` on the `Post` table. All the data in the column will be lost.
  - The `active` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `preferedContact` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'FOUND', 'ARCHIVED');

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_belongsToId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postedAboutId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postedAboutId",
ADD COLUMN     "imagesURL" TEXT[],
DROP COLUMN "active",
ADD COLUMN     "active" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "preferedContact";

-- DropTable
DROP TABLE "Pet";

-- DropEnum
DROP TYPE "PetStatus";

-- DropEnum
DROP TYPE "PetType";

-- DropEnum
DROP TYPE "PreferedContact";
