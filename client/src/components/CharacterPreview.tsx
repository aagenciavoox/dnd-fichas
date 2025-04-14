import { Character } from "@shared/schema";
import { getModifier } from "@/lib/characterUtils";

interface CharacterPreviewProps {
  character: Character;
}

export const CharacterPreview = ({ character }: CharacterPreviewProps) => {
  const attributeKeys = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
  const attributeAbbreviations = {
    strength: 'FOR',
    dexterity: 'DES',
    constitution: 'CON',
    intelligence: 'INT', 
    wisdom: 'SAB',
    charisma: 'CAR'
  };

  // Get suggested abilities based on class
  const getSuggestedAbilities = () => {
    switch (character.class) {
      case "Bárbaro":
        return ["Fúria", "Defesa sem Armadura", "Ataque Temerário"];
      case "Guerreiro":
        return ["Surto de Ação", "Estilo de Luta: Proteção", "Segunda Investida"];
      case "Mago":
        return ["Recuperação Arcana", "Conjuração de Rituais", "Tradição Arcana"];
      case "Clérigo":
        return ["Canalizar Divindade", "Domínio Divino", "Destruir Mortos-Vivos"];
      case "Ladino":
        return ["Especialista", "Ataque Furtivo", "Gíria de Ladrão"];
      case "Druida":
        return ["Forma Selvagem", "Conjuração de Rituais", "Círculo da Terra"];
      case "Paladino":
        return ["Sentido Divino", "Cura pelas Mãos", "Destruir Inimigos"];
      case "Bardo":
        return ["Inspiração de Bardo", "Versatilidade", "Canção de Descanso"];
      default:
        return ["Selecione uma classe para ver habilidades sugeridas"];
    }
  };

  return (
    <div className="parchment-bg p-3 sm:p-4 rounded-lg w-[280px] sm:w-64 shadow-lg border-2 border-slate-900/30">
      <h3 className="font-medieval text-lg sm:text-xl text-primary mb-2 sm:mb-3 text-center">Prévia do Personagem</h3>
      
      <div className="flex justify-center mb-3 sm:mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      </div>
      
      <div className="text-center mb-3 sm:mb-4">
        <p className="font-cinzel text-slate-900 text-base sm:text-lg">
          {character.name || "Nome do Herói"}
        </p>
        <p className="text-slate-900 text-xs sm:text-sm italic">
          {character.race && character.class 
            ? `${character.race} - ${character.class}` 
            : "Raça - Classe"}
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-1 sm:gap-2 mb-3 sm:mb-4">
        {attributeKeys.map(attr => (
          <div key={attr} className="text-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary mx-auto flex items-center justify-center text-white font-semibold text-sm sm:text-base">
              {character.attributes[attr]}
            </div>
            <span className="text-slate-900 text-[10px] sm:text-xs">
              {attributeAbbreviations[attr]} ({getModifier(character.attributes[attr])})
            </span>
          </div>
        ))}
      </div>
      
      <div className="bg-white bg-opacity-70 p-2 rounded mb-2 sm:mb-3">
        <h4 className="font-cinzel text-slate-900 text-xs sm:text-sm font-semibold mb-1">Habilidades Sugeridas:</h4>
        <ul className="text-[10px] sm:text-xs text-slate-900 pl-3 sm:pl-4 list-disc">
          {getSuggestedAbilities().slice(0, 3).map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
      </div>
      
      <div className="flex justify-center">
        <button className="dice-btn w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.6 2.4a.4.4 0 0 0-1.2 0L9.6 7.7a.4.4 0 0 1-.6.2L3.8 4.8a.4.4 0 0 0-.6.5l3.1 7.5a.4.4 0 0 1-.2.5L1.9 15a.4.4 0 0 0 0 .8l5.2 1.4a.4.4 0 0 1 .3.6l-2.2 6.2a.4.4 0 0 0 .6.5l5.1-3.8a.4.4 0 0 1 .6 0l6.2 3.1a.4.4 0 0 0 .6-.5l-2.1-5.9a.4.4 0 0 1 .3-.6l5.1-1.2a.4.4 0 0 0 0-.8l-6.6-1.9a.4.4 0 0 1-.2-.5l2.1-5.8a.4.4 0 0 0-.6-.5l-3.8 3.7a.4.4 0 0 1-.6 0l-1.1-.8Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
