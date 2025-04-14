import { Character } from "@shared/schema";
import { classes, skills } from "@shared/dndData";

// Calculate ability modifier from ability score
export const getModifier = (score: number): number => {
  return Math.floor((score - 10) / 2);
};

// Get skill modifier for a character
export const getSkillModifier = (character: Character, skill: { name: string, attribute: string }): number => {
  // Get the base attribute modifier
  const attributeKey = skill.attribute as keyof typeof character.attributes;
  const baseModifier = getModifier(character.attributes[attributeKey]);
  
  // Add proficiency bonus (+2 at level 1) if character is proficient in this skill
  const isProficient = character.skills && character.skills.includes(skill.name);
  const proficiencyBonus = isProficient ? 2 : 0;
  
  return baseModifier + proficiencyBonus;
};

// Recommend classes based on play style
export const recommendClassesForPlayStyle = (playStyle: string): string[] => {
  switch (playStyle) {
    case 'combat':
      return ['Bárbaro', 'Guerreiro', 'Paladino', 'Guardião'];
    case 'magic':
      return ['Mago', 'Feiticeiro', 'Bruxo', 'Druida'];
    case 'support':
      return ['Clérigo', 'Bardo', 'Druida', 'Paladino'];
    case 'stealth':
      return ['Ladino', 'Monge', 'Guardião', 'Bardo'];
    default:
      return [];
  }
};

// Get recommended attributes for a class and play style
export const getRecommendedAttributes = (characterClass: string, playStyle: string): Character['attributes'] => {
  // Base attributes
  const baseAttributes = {
    strength: 8,
    dexterity: 8,
    constitution: 8,
    intelligence: 8,
    wisdom: 8, 
    charisma: 8
  };
  
  // Find the class definition
  const classInfo = classes.find(c => c.name === characterClass);
  
  if (!classInfo) return baseAttributes;
  
  // Prioritize key abilities of the class
  let priorities: (keyof typeof baseAttributes)[] = [];
  
  if (classInfo.keyAbilities.includes('Força')) {
    priorities.push('strength');
  }
  if (classInfo.keyAbilities.includes('Destreza')) {
    priorities.push('dexterity');
  }
  if (classInfo.keyAbilities.includes('Constituição')) {
    priorities.push('constitution');
  }
  if (classInfo.keyAbilities.includes('Inteligência')) {
    priorities.push('intelligence');
  }
  if (classInfo.keyAbilities.includes('Sabedoria')) {
    priorities.push('wisdom');
  }
  if (classInfo.keyAbilities.includes('Carisma')) {
    priorities.push('charisma');
  }
  
  // Always add Constitution as secondary priority if not already in priorities
  if (!priorities.includes('constitution')) {
    priorities.push('constitution');
  }
  
  // Adjust based on play style
  if (playStyle === 'combat' && !priorities.includes('strength')) {
    priorities.push('strength');
  } else if (playStyle === 'stealth' && !priorities.includes('dexterity')) {
    priorities.push('dexterity');
  } else if (playStyle === 'magic' && !priorities.includes('intelligence')) {
    priorities.push('intelligence');
  } else if (playStyle === 'support' && !priorities.includes('wisdom')) {
    priorities.push('wisdom');
  }
  
  // Assign attribute values based on priorities
  const result = { ...baseAttributes };
  
  // Primary attribute (first in priorities)
  if (priorities[0]) {
    result[priorities[0]] = 15;
  }
  
  // Secondary attribute
  if (priorities[1]) {
    result[priorities[1]] = 14;
  }
  
  // Tertiary attribute
  if (priorities[2]) {
    result[priorities[2]] = 13;
  }
  
  // Fourth attribute
  if (priorities[3]) {
    result[priorities[3]] = 12;
  }
  
  // Remaining attributes get 10 and 8
  const remainingAttributes = Object.keys(baseAttributes) as Array<keyof typeof baseAttributes>;
  const unusedAttributes = remainingAttributes.filter(attr => !priorities.includes(attr));
  
  if (unusedAttributes[0]) {
    result[unusedAttributes[0]] = 10;
  }
  
  return result;
};

// Get skills recommended for a class
export const getClassSkills = (characterClass: string, maxSkills: number): string[] => {
  switch (characterClass) {
    case 'Bárbaro':
      return ['Atletismo', 'Intimidação', 'Natureza', 'Percepção'].slice(0, maxSkills);
    case 'Bardo':
      return ['Atuação', 'Persuasão', 'Enganação', 'História'].slice(0, maxSkills);
    case 'Clérigo':
      return ['Medicina', 'Intuição', 'Religião', 'Persuasão'].slice(0, maxSkills);
    case 'Druida':
      return ['Natureza', 'Sobrevivência', 'Percepção', 'Lidar com Animais'].slice(0, maxSkills);
    case 'Guerreiro':
      return ['Atletismo', 'Intimidação', 'Percepção', 'Sobrevivência'].slice(0, maxSkills);
    case 'Monge':
      return ['Acrobacia', 'Furtividade', 'Intuição', 'Religião'].slice(0, maxSkills);
    case 'Paladino':
      return ['Intimidação', 'Religião', 'Persuasão', 'Medicina'].slice(0, maxSkills);
    case 'Guardião':
      return ['Furtividade', 'Percepção', 'Natureza', 'Sobrevivência'].slice(0, maxSkills);
    case 'Ladino':
      return ['Furtividade', 'Acrobacia', 'Percepção', 'Enganação'].slice(0, maxSkills);
    case 'Feiticeiro':
      return ['Intimidação', 'Persuasão', 'Arcana', 'Enganação'].slice(0, maxSkills);
    case 'Bruxo':
      return ['Arcana', 'Enganação', 'Intimidação', 'Religião'].slice(0, maxSkills);
    case 'Mago':
      return ['Arcana', 'História', 'Investigação', 'Religião'].slice(0, maxSkills);
    default:
      return skills.slice(0, maxSkills).map(skill => skill.name);
  }
};

// Get equipment based on class
export const getEquipmentForClass = (characterClass: string): string[] => {
  switch (characterClass) {
    case 'Bárbaro':
      return ['Machado grande', 'Duas machadinhas', 'Pacote de explorador', 'Quatro azagaias'];
    case 'Bardo':
      return ['Rapieira', 'Pacote de artista', 'Alaúde', 'Armadura de couro', 'Adaga'];
    case 'Clérigo':
      return ['Maça', 'Armadura escamada', 'Escudo leve', 'Símbolo sagrado', 'Pacote de sacerdote'];
    case 'Druida':
      return ['Escudo de madeira', 'Cimitarra', 'Pacote de explorador', 'Foco druídico'];
    case 'Guerreiro':
      return ['Espada longa', 'Escudo', 'Besta leve', 'Armadura de malha', 'Pacote de aventureiro'];
    case 'Monge':
      return ['Bastão', 'Adaga', 'Pacote de explorador', '10 dardos'];
    case 'Paladino':
      return ['Espada longa', 'Escudo', 'Armadura de malha', 'Símbolo sagrado', 'Pacote de sacerdote'];
    case 'Guardião':
      return ['Espada curta', 'Arco longo', 'Armadura de couro', 'Pacote de explorador'];
    case 'Ladino':
      return ['Rapieira', 'Arco curto', 'Armadura de couro', 'Ferramentas de ladrão', 'Pacote do assaltante'];
    case 'Feiticeiro':
      return ['Adaga', 'Bolsa de componentes', 'Pacote de explorador', 'Foco arcano'];
    case 'Bruxo':
      return ['Adaga', 'Armadura de couro', 'Foco arcano', 'Pacote de estudioso', 'Grimório'];
    case 'Mago':
      return ['Bastão', 'Bolsa de componentes', 'Grimório', 'Pacote de estudioso'];
    default:
      return ['Adaga', 'Pacote de aventureiro', 'Roupa comum'];
  }
};

// Get spells based on class
export const getSpellsForClass = (characterClass: string): string[] => {
  switch (characterClass) {
    case 'Mago':
      return ['Raio de Fogo', 'Mísseis Mágicos', 'Escudo Arcano', 'Detectar Magia', 'Compreender Idiomas', 'Mãos Mágicas'];
    case 'Clérigo':
      return ['Chama Sagrada', 'Orientação', 'Curar Ferimentos', 'Comando', 'Bênção', 'Santuário'];
    case 'Druida':
      return ['Druidismo', 'Orientação', 'Curar Ferimentos', 'Criar ou Destruir Água', 'Enfeitiçar Pessoa', 'Falar com Animais'];
    case 'Bardo':
      return ['Vitalidade Falsa', 'Ilusão Menor', 'Curar Ferimentos', 'Falar com Animais', 'Enfeitiçar Pessoa', 'Sono'];
    case 'Bruxo':
      return ['Toque Arrepiante', 'Explosão Oculta', 'Enfeitiçar Pessoa', 'Proteção contra o Bem e Mal', 'Braços de Hadar'];
    case 'Feiticeiro':
      return ['Raio de Fogo', 'Luz', 'Mísseis Mágicos', 'Escudo', 'Detectar Magia', 'Mãos Mágicas'];
    case 'Paladino':
      return ['Curar Ferimentos', 'Comando', 'Bênção', 'Escudo da Fé'];
    default:
      return [];
  }
};
