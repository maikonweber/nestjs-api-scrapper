/*
  Warnings:

  - You are about to drop the column `caixa` on the `caixa_central` table. All the data in the column will be lost.
  - Added the required column `tipo` to the `caixa_central` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "caixa_central" DROP COLUMN "caixa",
ADD COLUMN     "tipo" "tipo" NOT NULL;
