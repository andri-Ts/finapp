-- CreateEnum
CREATE TYPE "TransferRole" AS ENUM ('SOURCE', 'DESTINATION');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transferRole" "TransferRole";
