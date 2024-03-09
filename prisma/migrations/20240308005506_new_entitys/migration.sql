-- CreateTable
CREATE TABLE "binance_key_user" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "app_secret" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "binance_key_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transfer_carteira_log" (
    "id" SERIAL NOT NULL,
    "amout" DECIMAL(65,30) NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receive_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "transfer_carteira_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bitcoin_transactions" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(20,8) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_time" TIMESTAMP(3) NOT NULL,
    "entry_point" DECIMAL(20,8) NOT NULL,
    "close_point" DECIMAL(20,8) NOT NULL,
    "win_loss" BOOLEAN NOT NULL,
    "amout_win" DECIMAL(20,8) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "bitcoin_transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "binance_key_user" ADD CONSTRAINT "binance_key_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_carteira_log" ADD CONSTRAINT "transfer_carteira_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bitcoin_transactions" ADD CONSTRAINT "bitcoin_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
