-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "GameTransaction" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "betAmount" INTEGER NOT NULL,
    "multiplier" INTEGER NOT NULL,
    "payout" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameTransaction" ADD CONSTRAINT "GameTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
