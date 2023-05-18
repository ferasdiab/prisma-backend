/*
  Warnings:

  - You are about to drop the `_PackageToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PackageToService` DROP FOREIGN KEY `_PackageToService_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PackageToService` DROP FOREIGN KEY `_PackageToService_B_fkey`;

-- DropTable
DROP TABLE `_PackageToService`;

-- CreateTable
CREATE TABLE `ServiceInPackage` (
    `id` VARCHAR(191) NOT NULL,
    `packageId` VARCHAR(191) NOT NULL,
    `serviceId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiceInPackage` ADD CONSTRAINT `ServiceInPackage_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceInPackage` ADD CONSTRAINT `ServiceInPackage_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
