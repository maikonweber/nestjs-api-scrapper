/*
  Warnings:

  - Added the required column `permission` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "carteira" DROP CONSTRAINT "carteira_user_id_fkey";

-- AlterTable
ALTER TABLE "carteira" ADD COLUMN     "usersId" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "permission" JSONB NOT NULL;

-- CreateTable
CREATE TABLE "email_template" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "template" TEXT NOT NULL,

    CONSTRAINT "email_template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_send" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "toEmail" TEXT NOT NULL,
    "fromEmail" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "enviado" TIMESTAMP(3) NOT NULL,
    "cancelado" TIMESTAMP(3) NOT NULL,
    "falha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_send_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "email_template" ADD CONSTRAINT "email_template_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_send" ADD CONSTRAINT "email_send_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carteira" ADD CONSTRAINT "carteira_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
