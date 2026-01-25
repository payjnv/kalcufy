-- CreateEnum
CREATE TYPE "TrackingType" AS ENUM ('VIEW', 'CALCULATION');

-- AlterTable
ALTER TABLE "calculator_usage" ADD COLUMN     "type" "TrackingType" NOT NULL DEFAULT 'VIEW';
