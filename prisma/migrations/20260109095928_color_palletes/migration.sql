/*
  Warnings:

  - Added the required column `ussageDoc` to the `Component` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Component" ADD COLUMN     "ussageDoc" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ColorPalletes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hexCodes" TEXT[],
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ColorPalletes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ColorPalletes_projectId_idx" ON "ColorPalletes"("projectId");

-- AddForeignKey
ALTER TABLE "ColorPalletes" ADD CONSTRAINT "ColorPalletes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
