-- AlterTable
ALTER TABLE `pages` ADD COLUMN `authorId` INTEGER;

-- AddForeignKey
ALTER TABLE `pages` ADD FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
