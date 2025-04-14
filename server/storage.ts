import { Character, InsertCharacter } from "@shared/schema";

// Define the storage interface with CRUD operations for characters
export interface IStorage {
  getCharacter(id: number): Promise<Character | undefined>;
  getAllCharacters(): Promise<Character[]>;
  createCharacter(character: InsertCharacter): Promise<Character>;
  updateCharacter(id: number, character: Partial<InsertCharacter>): Promise<Character | undefined>;
  deleteCharacter(id: number): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private characters: Map<number, Character>;
  private currentId: number;

  constructor() {
    this.characters = new Map();
    this.currentId = 1;
  }

  async getCharacter(id: number): Promise<Character | undefined> {
    return this.characters.get(id);
  }

  async getAllCharacters(): Promise<Character[]> {
    return Array.from(this.characters.values());
  }

  async createCharacter(characterData: InsertCharacter): Promise<Character> {
    const id = this.currentId++;
    const character: Character = { ...characterData, id };
    this.characters.set(id, character);
    return character;
  }

  async updateCharacter(id: number, characterData: Partial<InsertCharacter>): Promise<Character | undefined> {
    const existingCharacter = this.characters.get(id);
    
    if (!existingCharacter) {
      return undefined;
    }
    
    const updatedCharacter: Character = {
      ...existingCharacter,
      ...characterData,
      id // Ensure ID doesn't change
    };
    
    this.characters.set(id, updatedCharacter);
    return updatedCharacter;
  }

  async deleteCharacter(id: number): Promise<boolean> {
    return this.characters.delete(id);
  }
}

export const storage = new MemStorage();
