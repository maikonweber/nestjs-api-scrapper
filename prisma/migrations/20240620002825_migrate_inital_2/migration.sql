-- CreateTable
CREATE TABLE "tabela_video_cortes" (
    "id" SERIAL NOT NULL,
    "nome_arquivo" VARCHAR(255) NOT NULL,
    "tempo_inicia" INTEGER NOT NULL,
    "tempo_final" INTEGER NOT NULL,
    "deletado" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "categoria" VARCHAR(255),

    CONSTRAINT "tabela_video_cortes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tabela_views" (
    "fk_video_cortes" INTEGER,
    "views" INTEGER NOT NULL,
    "publicado" DATE NOT NULL
);

-- AddForeignKey
ALTER TABLE "tabela_views" ADD CONSTRAINT "tabela_views_fk_video_cortes_fkey" FOREIGN KEY ("fk_video_cortes") REFERENCES "tabela_video_cortes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
