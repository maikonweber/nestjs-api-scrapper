-- CreateEnum
CREATE TYPE "sub_tipo" AS ENUM ('Compras', 'Lazer', 'Transporte', 'Contas', 'Investimentos');

-- CreateEnum
CREATE TYPE "tipo" AS ENUM ('RECEITA', 'DESPESA');

-- CreateTable
CREATE TABLE "carteira" (
    "saldo" DECIMAL(65,30) NOT NULL,
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rentabilida_tabela" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "rent" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "rentabilida_tabela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investimentos_carteira" (
    "saldo" DECIMAL(65,30) NOT NULL,
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "investimentos_carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "investimento_user" (
    "id" SERIAL NOT NULL,
    "rentabilidade" DECIMAL(65,30) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "expect" DECIMAL(65,30) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "investimento_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caixa_central" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "enum" "tipo" NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "sub_tipo" "sub_tipo" NOT NULL,

    CONSTRAINT "caixa_central_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investimentos_carteira" ADD CONSTRAINT "investimentos_carteira_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investimento_user" ADD CONSTRAINT "investimento_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caixa_central" ADD CONSTRAINT "caixa_central_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
