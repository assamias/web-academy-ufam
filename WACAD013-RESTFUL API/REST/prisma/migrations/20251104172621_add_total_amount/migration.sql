/*
  Warnings:

  - Added the required column `totalAmount` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Purchase` ADD COLUMN `totalAmount` DECIMAL(10, 2) NOT NULL;
