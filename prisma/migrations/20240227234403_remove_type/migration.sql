/*
  Warnings:

  - You are about to drop the column `tipo` on the `caixa_central` table. All the data in the column will be lost.
  - Added the required column `typo` to the `caixa_central` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Tipo" AS ENUM ('RECEITA', 'DESPESA');

-- AlterTable
ALTER TABLE "caixa_central" DROP COLUMN "tipo",
ADD COLUMN     "typo" "Tipo" NOT NULL;

-- DropEnum
DROP TYPE "tipo";
