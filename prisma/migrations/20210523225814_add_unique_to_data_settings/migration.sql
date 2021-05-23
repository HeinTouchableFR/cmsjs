/*
  Warnings:

  - You are about to alter the column `data` on the `settings` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - A unique constraint covering the columns `[data]` on the table `Settings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `settings` MODIFY `data` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Settings.data_unique` ON `Settings`(`data`);
