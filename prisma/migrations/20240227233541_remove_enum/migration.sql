/*
  Warnings:

  - You are about to drop the column `enum` on the `caixa_central` table. All the data in the column will be lost.
  - Added the required column `caixa` to the `caixa_central` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "caixa_central" DROP COLUMN "enum",
ADD COLUMN     "caixa" "tipo" NOT NULL;
