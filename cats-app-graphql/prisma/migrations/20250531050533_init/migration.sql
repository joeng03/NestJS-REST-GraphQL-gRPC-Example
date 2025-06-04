/*
  Warnings:

  - The primary key for the `_CatToTrainer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_CatToTrainer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "_CatToTrainer" DROP CONSTRAINT "_CatToTrainer_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_CatToTrainer_AB_unique" ON "_CatToTrainer"("A", "B");
