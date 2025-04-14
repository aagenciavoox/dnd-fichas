import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCharacterSchema } from "@shared/schema";
import { ZodError } from "zod";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Route to create a new character
  app.post("/api/characters", async (req, res) => {
    try {
      // Validate character data
      const validatedData = insertCharacterSchema.parse(req.body);
      
      // Create character in storage
      const character = await storage.createCharacter(validatedData);
      
      res.status(201).json(character);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error creating character:", error);
        res.status(500).json({ message: "Error creating character" });
      }
    }
  });

  // Route to get all characters
  app.get("/api/characters", async (req, res) => {
    try {
      const characters = await storage.getAllCharacters();
      res.json(characters);
    } catch (error) {
      console.error("Error fetching characters:", error);
      res.status(500).json({ message: "Error fetching characters" });
    }
  });

  // Route to get a specific character by ID
  app.get("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }
      
      const character = await storage.getCharacter(id);
      
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      res.json(character);
    } catch (error) {
      console.error("Error fetching character:", error);
      res.status(500).json({ message: "Error fetching character" });
    }
  });

  // Route to update a character
  app.patch("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }
      
      // Validate update data with partial schema
      const updateSchema = insertCharacterSchema.partial();
      const validatedData = updateSchema.parse(req.body);
      
      const updatedCharacter = await storage.updateCharacter(id, validatedData);
      
      if (!updatedCharacter) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      res.json(updatedCharacter);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error("Error updating character:", error);
        res.status(500).json({ message: "Error updating character" });
      }
    }
  });

  // Route to delete a character
  app.delete("/api/characters/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid character ID" });
      }
      
      const success = await storage.deleteCharacter(id);
      
      if (!success) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting character:", error);
      res.status(500).json({ message: "Error deleting character" });
    }
  });

  // Route to export a character as PDF (simulated)
  app.post("/api/characters/export", async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: "Character ID is required" });
      }
      
      const character = await storage.getCharacter(id);
      
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      
      // Generate a simple text representation of the character sheet
      // In a real application, you would use a PDF generation library
      const characterSheet = `
D&D 5E CHARACTER SHEET
======================
Name: ${character.name}
Race: ${character.race}
Class: ${character.class}
Level: ${character.level}
Background: ${character.background || 'None'}

ATTRIBUTES
----------
Strength: ${character.attributes.strength} (${Math.floor((character.attributes.strength - 10) / 2)})
Dexterity: ${character.attributes.dexterity} (${Math.floor((character.attributes.dexterity - 10) / 2)})
Constitution: ${character.attributes.constitution} (${Math.floor((character.attributes.constitution - 10) / 2)})
Intelligence: ${character.attributes.intelligence} (${Math.floor((character.attributes.intelligence - 10) / 2)})
Wisdom: ${character.attributes.wisdom} (${Math.floor((character.attributes.wisdom - 10) / 2)})
Charisma: ${character.attributes.charisma} (${Math.floor((character.attributes.charisma - 10) / 2)})

SKILLS
------
${character.skills ? character.skills.join(', ') : 'None'}

EQUIPMENT
---------
${character.equipment ? character.equipment.join('\n') : 'None'}

SPELLS
------
${character.spells ? character.spells.join('\n') : 'None'}
      `;
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${character.name}.pdf"`);
      res.send(characterSheet);
    } catch (error) {
      console.error("Error exporting character:", error);
      res.status(500).json({ message: "Error exporting character" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
