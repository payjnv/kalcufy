-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('FINANCE', 'HEALTH', 'TIPS', 'NEWS', 'GUIDES');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "slugEn" TEXT NOT NULL,
    "slugEs" TEXT,
    "slugPt" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleEs" TEXT,
    "titlePt" TEXT,
    "excerptEn" TEXT,
    "excerptEs" TEXT,
    "excerptPt" TEXT,
    "contentEn" TEXT NOT NULL,
    "contentEs" TEXT,
    "contentPt" TEXT,
    "metaTitleEn" TEXT,
    "metaTitleEs" TEXT,
    "metaTitlePt" TEXT,
    "metaDescriptionEn" TEXT,
    "metaDescriptionEs" TEXT,
    "metaDescriptionPt" TEXT,
    "featuredImage" TEXT,
    "ogImage" TEXT,
    "category" "PostCategory" NOT NULL DEFAULT 'FINANCE',
    "tags" TEXT[],
    "relatedCalculator" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "readingTime" INTEGER NOT NULL DEFAULT 5,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_slugEn_key" ON "posts"("slugEn");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slugEs_key" ON "posts"("slugEs");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slugPt_key" ON "posts"("slugPt");

-- CreateIndex
CREATE INDEX "posts_status_publishedAt_idx" ON "posts"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "posts_category_idx" ON "posts"("category");

-- CreateIndex
CREATE INDEX "posts_authorId_idx" ON "posts"("authorId");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
