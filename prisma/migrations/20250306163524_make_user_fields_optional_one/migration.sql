-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "body_number" DROP NOT NULL,
ALTER COLUMN "body_type" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "frame_number" DROP NOT NULL,
ALTER COLUMN "horsepower" DROP NOT NULL,
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "vin" DROP NOT NULL;
