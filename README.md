# D&D Character Creator

Uma ferramenta interativa de criação de personagens para Dungeons & Dragons que sugere builds otimizadas baseadas no estilo de jogo do jogador.

## Recursos

- Interface intuitiva de criação de personagens em várias etapas
- Recomendações de classe baseadas no estilo de jogo escolhido
- Distribuição inteligente de atributos
- Visualização em tempo real da ficha do personagem
- Design responsivo para celulares, tablets e desktops
- Salvamento de personagens

## Tecnologias

- Frontend: React, TypeScript, Tailwind CSS, ShadCN UI
- Backend: Node.js, Express (desenvolvimento local) ou Funções Serverless (Netlify)
- Armazenamento: In-memory (desenvolvimento) ou FaunaDB (produção)

## Implantação no Netlify

### Preparação

O projeto está pronto para ser implantado no Netlify com configurações serverless. Siga os passos abaixo:

1. Certifique-se de ter uma conta no [Netlify](https://www.netlify.com/)
2. Faça fork/clone deste repositório no GitHub

### Implantação a partir do GitHub

1. Faça login no Netlify
2. Clique em "New site from Git"
3. Selecione o repositório GitHub
4. Configure as seguintes opções:
   - Build command: `bash build-netlify.sh`
   - Publish directory: `dist`
5. Clique em "Deploy site"

### Verificação

Após a implantação, você pode acessar o site através do domínio fornecido pelo Netlify (algo como `seu-site.netlify.app`).

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O servidor de desenvolvimento estará disponível em `http://localhost:5000`.

## Estrutura do Projeto

- `/client` - Aplicação frontend React
- `/server` - API Express para desenvolvimento local
- `/netlify` - Funções serverless para produção no Netlify
- `/shared` - Esquemas e tipos compartilhados entre frontend e backend