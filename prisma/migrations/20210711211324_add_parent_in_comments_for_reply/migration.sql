-- AlterTable
ALTER TABLE `comments` ADD COLUMN `parentId` INTEGER;

-- AddForeignKey
ALTER TABLE `comments` ADD FOREIGN KEY (`parentId`) REFERENCES `comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
