/*
  Warnings:

  - Added the required column `body_number` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `body_type` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frame_number` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horsepower` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vin` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `citizenship` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail_code` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "body_number" TEXT NOT NULL,
ADD COLUMN     "body_type" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "frame_number" TEXT NOT NULL,
ADD COLUMN     "horsepower" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "vin" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "citizenship" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "mail_code" TEXT NOT NULL,
ADD COLUMN     "middle_name" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;
