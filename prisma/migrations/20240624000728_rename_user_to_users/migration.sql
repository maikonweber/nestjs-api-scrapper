/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "binance_key_user" DROP CONSTRAINT "binance_key_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "bitcoin_transactions" DROP CONSTRAINT "bitcoin_transactions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "caixa_central" DROP CONSTRAINT "caixa_central_user_id_fkey";

-- DropForeignKey
ALTER TABLE "carteira" DROP CONSTRAINT "carteira_user_id_fkey";

-- DropForeignKey
ALTER TABLE "investimento_user" DROP CONSTRAINT "investimento_user_user_id_fkey";

-- DropForeignKey
ALTER TABLE "investimentos_carteira" DROP CONSTRAINT "investimentos_carteira_user_id_fkey";

-- DropForeignKey
ALTER TABLE "transfer_carteira_log" DROP CONSTRAINT "transfer_carteira_log_user_id_fkey";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "lastname" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investimentos_carteira" ADD CONSTRAINT "investimentos_carteira_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "binance_key_user" ADD CONSTRAINT "binance_key_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_carteira_log" ADD CONSTRAINT "transfer_carteira_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investimento_user" ADD CONSTRAINT "investimento_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bitcoin_transactions" ADD CONSTRAINT "bitcoin_transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixa_central" ADD CONSTRAINT "caixa_central_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
