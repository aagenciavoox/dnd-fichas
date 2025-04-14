// Implementação de armazenamento em memória para Netlify Functions
class MemStorage {
  constructor() {
    this.characters = new Map();
    this.currentId = 1;
    
    // Inicializar com alguns exemplos se necessário
    /*
    const exampleCharacter = {
      id: this.currentId,
      name: "Exemplo",
      race: "Humano",
      class: "Guerreiro",
      level: 1,
      attributes: {
        strength: 14,
        dexterity: 12,
        constitution: 13,
        intelligence: 10,
        wisdom: 10,
        charisma: 11
      },
      playStyle: "combat",
      skills: ["Atletismo", "Intimidação"],
      equipment: ["Espada longa", "Armadura de couro"],
      spells: [],
      background: "Soldado",
      alignment: "Neutro"
    };
    this.characters.set(this.currentId, exampleCharacter);
    this.currentId++;
    */
  }

  async getCharacter(id) {
    return this.characters.get(id);
  }

  async getAllCharacters() {
    return Array.from(this.characters.values());
  }

  async createCharacter(characterData) {
    const id = this.currentId++;
    const character = { ...characterData, id };
    this.characters.set(id, character);
    return character;
  }

  async updateCharacter(id, characterData) {
    const character = this.characters.get(id);
    if (!character) return undefined;

    const updatedCharacter = { ...character, ...characterData };
    this.characters.set(id, updatedCharacter);
    return updatedCharacter;
  }

  async deleteCharacter(id) {
    if (!this.characters.has(id)) return false;
    return this.characters.delete(id);
  }
}

exports.storage = new MemStorage();