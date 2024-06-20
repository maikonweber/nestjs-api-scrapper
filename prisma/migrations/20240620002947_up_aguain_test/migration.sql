/*
  Warnings:

  - The primary key for the `bitcoin_transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `bitcoin_transactions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bitcoin_transactions" DROP CONSTRAINT "bitcoin_transactions_pkey",
DROP COLUMN "id",
ADD COLUMN     "transaction_id" SERIAL NOT NULL,
ADD CONSTRAINT "bitcoin_transactions_pkey" PRIMARY KEY ("transaction_id");

-- AlterTable
ALTER TABLE "tabela_views" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tabela_views_pkey" PRIMARY KEY ("id");
