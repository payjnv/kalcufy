/*
  Warnings:

  - You are about to drop the column `category` on the `posts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "posts_category_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT;

-- DropEnum
DROP TYPE "PostCategory";

-- CreateTable
CREATE TABLE "blog_categories" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameEs" TEXT,
    "namePt" TEXT,
    "icon" TEXT,
    "color" TEXT NOT NULL DEFAULT 'blue',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_slug_key" ON "blog_categories"("slug");

-- CreateIndex
CREATE INDEX "posts_categoryId_idx" ON "posts"("categoryId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "blog_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
