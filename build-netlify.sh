#!/bin/bash

# Script para build da aplicação para deploy no Netlify

# Build do cliente
echo "Construindo o frontend..."
npm run build

# Copia as funções serverless para a pasta dist
echo "Preparando funções serverless..."
mkdir -p dist/functions
cp -r netlify/functions/* dist/functions/
cp netlify/storage.js dist/functions/

echo "Build concluído com sucesso!"
echo "Agora você pode fazer deploy no Netlify seguindo estes passos:"
echo "1. Faça login no Netlify.com"
echo "2. Importe o projeto do seu repositório Git"
echo "3. Use as seguintes configurações ao importar:"
echo "   - Build command: bash build-netlify.sh"
echo "   - Publish directory: dist"
echo ""
echo "Sua aplicação estará disponível em um domínio *.netlify.app após o deploy!"