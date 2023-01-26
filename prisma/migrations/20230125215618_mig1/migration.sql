-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `role` ENUM('USER', 'ADMIN', 'GOD') NOT NULL DEFAULT 'USER',
    `active` BOOLEAN NOT NULL DEFAULT false,
    `blocked` BOOLEAN NOT NULL DEFAULT false,
    `imageUrl` VARCHAR(191) NOT NULL,
    `langKey` ENUM('EN', 'ES') NOT NULL DEFAULT 'ES',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Colony` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `address` VARCHAR(191) NOT NULL,
    `nearBy` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `type` ENUM('HOUSES', 'APARTMENTS') NOT NULL,
    `roleNotificationsSuspended` BOOLEAN NOT NULL DEFAULT false,
    `presidentId` INTEGER NOT NULL,
    `treasurerId` INTEGER NOT NULL,
    `secretaryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Residence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `doorNumber` VARCHAR(191) NOT NULL,
    `colonyId` INTEGER NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `tenantId` INTEGER NOT NULL,
    `responsibleId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResidenceTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `colonyId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ResidenceToResidenceTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ResidenceToResidenceTag_AB_unique`(`A`, `B`),
    INDEX `_ResidenceToResidenceTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Colony` ADD CONSTRAINT `Colony_presidentId_fkey` FOREIGN KEY (`presidentId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colony` ADD CONSTRAINT `Colony_treasurerId_fkey` FOREIGN KEY (`treasurerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Colony` ADD CONSTRAINT `Colony_secretaryId_fkey` FOREIGN KEY (`secretaryId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_colonyId_fkey` FOREIGN KEY (`colonyId`) REFERENCES `Colony`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Residence` ADD CONSTRAINT `Residence_responsibleId_fkey` FOREIGN KEY (`responsibleId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ResidenceTag` ADD CONSTRAINT `ResidenceTag_colonyId_fkey` FOREIGN KEY (`colonyId`) REFERENCES `Colony`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ResidenceToResidenceTag` ADD CONSTRAINT `_ResidenceToResidenceTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Residence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ResidenceToResidenceTag` ADD CONSTRAINT `_ResidenceToResidenceTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `ResidenceTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
