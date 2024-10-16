/*
  Warnings:

  - You are about to drop the column `feed` on the `cl_users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cl_users` DROP COLUMN `feed`;

-- CreateTable
CREATE TABLE `Posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` TEXT NOT NULL,
    `userId` INTEGER NOT NULL,
    `likes` INTEGER NOT NULL,
    `reposts` INTEGER NOT NULL,
    `replys` INTEGER NOT NULL,
    `reference` INTEGER NOT NULL,
    `views` INTEGER NOT NULL,
    `content` TEXT NULL,
    `images` TEXT NULL,
    `video` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `cl_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
