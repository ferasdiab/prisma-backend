-- AlterTable
ALTER TABLE `ConsumerBasket` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `ConsumerBasketService` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Package` ADD COLUMN `isDeleted` BOOLEAN NOT NULL DEFAULT false;
