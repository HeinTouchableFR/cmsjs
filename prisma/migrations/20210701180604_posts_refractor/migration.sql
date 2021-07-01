/*
  Warnings:

  - You are about to drop the column `pagesId` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `templatesId` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the `pages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templates` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pages` DROP FOREIGN KEY `pages_ibfk_1`;

-- DropForeignKey
ALTER TABLE `settings` DROP FOREIGN KEY `settings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `settings` DROP FOREIGN KEY `settings_ibfk_2`;

-- AlterTable
ALTER TABLE `settings` DROP COLUMN `pagesId`,
    DROP COLUMN `templatesId`,
    ADD COLUMN `postsId` INTEGER;

-- DropTable
DROP TABLE `pages`;

-- DropTable
DROP TABLE `templates`;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postType` ENUM('PAGE', 'ARTICLE', 'PRODUCT', 'FORM', 'HEADER', 'FOOTER') NOT NULL DEFAULT 'PAGE',
    `content` LONGTEXT,
    `description` VARCHAR(191),
    `params` VARCHAR(191),
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `published` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3),
    `authorId` INTEGER,

    UNIQUE INDEX `posts.slug_unique`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories.slug_unique`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_categoriesToposts` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_categoriesToposts_AB_unique`(`A`, `B`),
    INDEX `_categoriesToposts_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `settings` ADD FOREIGN KEY (`postsId`) REFERENCES `posts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categoriesToposts` ADD FOREIGN KEY (`A`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_categoriesToposts` ADD FOREIGN KEY (`B`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
