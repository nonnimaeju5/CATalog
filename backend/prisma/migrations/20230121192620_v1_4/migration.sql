/*
  Warnings:

  - You are about to drop the column `active` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "active",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'LOST';
