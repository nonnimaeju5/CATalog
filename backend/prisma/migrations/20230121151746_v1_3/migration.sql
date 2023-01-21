/*
  Warnings:

  - The values [ACTIVE] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('LOST', 'FOUND', 'ARCHIVED');
ALTER TABLE "Post" ALTER COLUMN "active" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "active" TYPE "Status_new" USING ("active"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Post" ALTER COLUMN "active" SET DEFAULT 'LOST';
COMMIT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "active" SET DEFAULT 'LOST';
