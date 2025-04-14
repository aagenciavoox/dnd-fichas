// Script para testar funções Netlify localmente
// Isso não é usado em produção, apenas para desenvolvimento

const { handler } = require('./functions/characters');

// Função auxiliar para simular uma requisição
async function simulateRequest(method, path, body = null) {
  const event = {
    httpMethod: method,
    path: path,
    body: body ? JSON.stringify(body) : null
  };
  
  console.log(`\n=== Teste de ${method} ${path} ===`);
  if (body) {
    console.log('Body:', body);
  }
  
  const response = await handler(event);
  console.log('Status:', response.statusCode);
  console.log('Response:', response.body ? JSON.parse(response.body) : '(empty)');
  console.log('===========================\n');
  
  return response;
}

// Testes automatizados básicos
async function runTests() {
  console.log('Iniciando testes das funções serverless do Netlify...\n');

  // Teste 1: Criar um personagem
  const createResponse = await simulateRequest('POST', '/api/characters', {
    name: "Teste Netlify",
    race: "Elfo",
    class: "Mago",
    level: 1,
    attributes: {
      strength: 8,
      dexterity: 16,
      constitution: 12,
      intelligence: 17,
      wisdom: 14,
      charisma: 10
    },
    playStyle: "magic",
    skills: ["Arcana", "História"],
    equipment: ["Livro de magias", "Cajado"],
    spells: ["Mísseis mágicos", "Detectar magia"],
    background: "Sábio",
    alignment: "Neutro e Bom"
  });

  const createdCharacter = JSON.parse(createResponse.body);
  
  // Teste 2: Obter todos os personagens
  await simulateRequest('GET', '/api/characters');
  
  // Teste 3: Obter um personagem específico
  if (createdCharacter && createdCharacter.id) {
    await simulateRequest('GET', `/api/characters/${createdCharacter.id}`);
  }
  
  // Teste 4: Atualizar um personagem
  if (createdCharacter && createdCharacter.id) {
    await simulateRequest('PUT', `/api/characters/${createdCharacter.id}`, {
      name: "Teste Netlify (Atualizado)",
      level: 2
    });
  }
  
  // Teste 5: Excluir um personagem
  if (createdCharacter && createdCharacter.id) {
    await simulateRequest('DELETE', `/api/characters/${createdCharacter.id}`);
  }
  
  console.log('Testes concluídos!');
}

// Executa os testes
runTests().catch(error => {
  console.error('Erro nos testes:', error);
});