-- DropIndex
DROP INDEX "Transaction_carId_key";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "buyerConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sellerConfirmed" BOOLEAN NOT NULL DEFAULT false;
