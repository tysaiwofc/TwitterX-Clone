/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `cl_users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `cl_users` MODIFY `email` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cl_users_email_key` ON `cl_users`(`email`);
