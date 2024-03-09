-- CreateTable
CREATE TABLE "testOrder" (
    "id" SERIAL NOT NULL,
    "buy_values" DECIMAL(20,8) NOT NULL,
    "sell_values" DECIMAL(20,8) NOT NULL,
    "open" BOOLEAN NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "close" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testOrder_pkey" PRIMARY KEY ("id")
);
