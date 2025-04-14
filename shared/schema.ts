import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const characters = pgTable("characters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  race: text("race").notNull(),
  class: text("class").notNull(),
  level: integer("level").notNull().default(1),
  playStyle: text("play_style"),
  attributes: jsonb("attributes").notNull(),
  skills: text("skills").array(),
  equipment: text("equipment").array(),
  spells: text("spells").array(),
  background: text("background"),
  alignment: text("alignment"),
  
  // Additional fields for character preferences
  combatStyle: integer("combat_style"),
  strengthAgility: integer("strength_agility"),
  charismaIntelligence: integer("charisma_intelligence"),
  planningImprovisation: integer("planning_improvisation")
});

export const insertCharacterSchema = createInsertSchema(characters).omit({ 
  id: true 
});

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof characters.$inferSelect;

// Define the interface for attributes
export interface CharacterAttributes {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
