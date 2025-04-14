// Função serverless para manipular personagens no Netlify
const { storage } = require('../storage');

exports.handler = async (event, context) => {
  // Configuração de CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Lidar com requisições OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Rotas GET
    if (event.httpMethod === 'GET') {
      // GET /api/characters/:id
      if (event.path.match(/\/api\/characters\/\d+$/)) {
        const id = parseInt(event.path.split('/').pop(), 10);
        const character = await storage.getCharacter(id);
        
        if (!character) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Personagem não encontrado' })
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(character)
        };
      }
      
      // GET /api/characters
      const characters = await storage.getAllCharacters();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(characters)
      };
    }

    // POST /api/characters
    if (event.httpMethod === 'POST') {
      const characterData = JSON.parse(event.body);
      const newCharacter = await storage.createCharacter(characterData);
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newCharacter)
      };
    }

    // PUT /api/characters/:id
    if (event.httpMethod === 'PUT' || event.httpMethod === 'PATCH') {
      if (event.path.match(/\/api\/characters\/\d+$/)) {
        const id = parseInt(event.path.split('/').pop(), 10);
        const characterData = JSON.parse(event.body);
        const updatedCharacter = await storage.updateCharacter(id, characterData);
        
        if (!updatedCharacter) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Personagem não encontrado' })
          };
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedCharacter)
        };
      }
    }

    // DELETE /api/characters/:id
    if (event.httpMethod === 'DELETE') {
      if (event.path.match(/\/api\/characters\/\d+$/)) {
        const id = parseInt(event.path.split('/').pop(), 10);
        const success = await storage.deleteCharacter(id);
        
        if (!success) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Personagem não encontrado' })
          };
        }
        
        return {
          statusCode: 204,
          headers,
          body: ''
        };
      }
    }

    // Rota não encontrada
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Rota não encontrada' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};