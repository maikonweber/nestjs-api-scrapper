#!/bin/bash

# Verifica se há um container rodando na porta 3001
if docker ps --format '{{.Ports}}' | grep -q '0.0.0.0:3001->3001/tcp'; then
    # Se encontrar, mata o container
    echo "Container na porta 3001 encontrado. Matando o container..."
    docker kill $(docker ps --format '{{.ID}}' | grep "$(docker ps --format '{{.Ports}}' | grep '0.0.0.0:3001->3001/tcp' | cut -d' ' -f1)" | head -n 1)
fi

# Remove o container se ele existir
if docker ps -a --format '{{.Ports}}' | grep -q '0.0.0.0:3001->3001/tcp'; then
    docker rm $(docker ps -a --format '{{.ID}}' | grep "$(docker ps -a --format '{{.Ports}}' | grep '0.0.0.0:3001->3001/tcp' | cut -d' ' -f1)" | head -n 1)
fi

# Executa o build na pasta do script Bash
echo "Executando build na pasta $(pwd)..."
docker build -t meu-aplicativo .

# Roda o container expondo a porta 3001
docker run -d -p 3001:3001 meu-aplicativo

echo "Aplicativo iniciado na porta 3001."
