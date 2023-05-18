/*
  Warnings:

  - You are about to alter the column `age` on the `Consumer` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Consumer` MODIFY `age` INTEGER NOT NULL DEFAULT 22;

-- DropTable
DROP TABLE `Test`;

-- CreateTable
CREATE TABLE `Package` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `totalPrice` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsumerBasket` (
    `id` VARCHAR(191) NOT NULL,
    `consumerId` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsumerBasketService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consumerBasketId` VARCHAR(191) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `serviceId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PackageToService` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PackageToService_AB_unique`(`A`, `B`),
    INDEX `_PackageToService_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ConsumerBasket` ADD CONSTRAINT `ConsumerBasket_consumerId_fkey` FOREIGN KEY (`consumerId`) REFERENCES `Consumer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumerBasket` ADD CONSTRAINT `ConsumerBasket_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumerBasketService` ADD CONSTRAINT `ConsumerBasketService_consumerBasketId_fkey` FOREIGN KEY (`consumerBasketId`) REFERENCES `ConsumerBasket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsumerBasketService` ADD CONSTRAINT `ConsumerBasketService_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PackageToService` ADD CONSTRAINT `_PackageToService_A_fkey` FOREIGN KEY (`A`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PackageToService` ADD CONSTRAINT `_PackageToService_B_fkey` FOREIGN KEY (`B`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
