import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Character } from "@shared/schema";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PlayStyleStepProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const PlayStyleStep = ({ character, onUpdateCharacter }: PlayStyleStepProps) => {
  const [doorScenario, setDoorScenario] = useState<string>("");
  const [nobleScenario, setNobleScenario] = useState<string>("");

  const handlePlayStyleSelect = (playStyle: string) => {
    onUpdateCharacter({ playStyle });
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    // This data will be used later to suggest classes and attributes
    onUpdateCharacter({ 
      [key]: parseInt(e.target.value) 
    } as unknown as Partial<Character>);
  };

  const handleScenarioChange = (scenario: string, value: string) => {
    if (scenario === 'door') {
      setDoorScenario(value);
    } else {
      setNobleScenario(value);
    }

    // Use these selections to refine character suggestions
    const playStyleSuggestions: Record<string, string> = {
      force: "combat",
      pick: "stealth",
      magic: "magic",
      find: "stealth",
      charm: "support",
      intimidate: "combat",
      logic: "magic",
      listen: "support"
    };

    if (doorScenario && nobleScenario) {
      const doorStyle = playStyleSuggestions[doorScenario];
      const nobleStyle = playStyleSuggestions[nobleScenario];
      
      // If both scenarios point to the same play style, set it
      if (doorStyle === nobleStyle) {
        onUpdateCharacter({ playStyle: doorStyle });
      }
    }
  };

  const playStyles = [
    {
      id: "combat",
      title: "Combatente",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H12a2 2 0 0 0-2 2v1.4a2 2 0 0 0 .5 1.3l.7.7a2 2 0 0 0 2.8 0l.7-.7a2 2 0 0 0 .5-1.3V4a2 2 0 0 0-2-2Z" />
          <path d="M17.8 14.5 20 12.2l-3.4-3.4a2 2 0 0 0-2.8 0L12 10.6" />
          <path d="M4 21.5V17l5-5 6 6-5 5H5.5a1.5 1.5 0 0 1-1.5-1.5Z" />
        </svg>
      ),
      description: "Você prefere estar na linha de frente, empunhando armas e protegendo seus aliados.",
      tags: ["Força", "Resistência", "Coragem"],
      tagColor: "bg-primary bg-opacity-10 text-primary"
    },
    {
      id: "magic",
      title: "Conjurador",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
          <path d="m14 7 3 3" />
          <path d="M5 6v4" />
          <path d="M19 14v4" />
          <path d="M10 2v2" />
          <path d="M7 8H3" />
          <path d="M21 16h-4" />
          <path d="M11 3H9" />
        </svg>
      ),
      description: "Você domina as artes arcanas, lançando magias poderosas para controlar o campo de batalha.",
      tags: ["Inteligência", "Sabedoria", "Conhecimento"],
      tagColor: "bg-slate-900 bg-opacity-10 text-slate-900"
    },
    {
      id: "support",
      title: "Suporte",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
          <path d="m18 15-2-2" />
          <path d="m15 18-2-2" />
        </svg>
      ),
      description: "Você mantém seus aliados vivos e fortalecidos, curando feridas e concedendo bênçãos.",
      tags: ["Cura", "Proteção", "Inspiração"],
      tagColor: "bg-green-700 bg-opacity-10 text-green-700"
    },
    {
      id: "stealth",
      title: "Furtivo",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 2H9v2m0 10a3 3 0 0 0 6 0m0-10v2" />
          <path d="M12 12a3 3 0 0 0 3 3H2v7h3.2a3 3 0 0 0 1.7-.5L10 19l3.1 2.4c.53.35 1.15.53 1.8.5h0a3 3 0 0 0 2.1-.9l5-5a3 3 0 0 0 0-4.2l-5-5a3 3 0 0 0-2.1-.9h0c-.64-.02-1.28.16-1.8.5L10 9l-3.1-2.4a3 3 0 0 0-1.7-.6H2" />
        </svg>
      ),
      description: "Você prefere as sombras, utilizando disfarces, armadilhas e ataques surpresa.",
      tags: ["Destreza", "Furtividade", "Precisão"],
      tagColor: "bg-amber-600 bg-opacity-10 text-amber-600"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-medieval text-primary mb-2 md:mb-4">Qual é o seu estilo de jogo?</h2>
      <p className="text-slate-900 text-sm md:text-base mb-4 md:mb-6">Escolha como você prefere jogar para que possamos sugerir o personagem ideal para você.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
        {playStyles.map((style) => (
          <div 
            key={style.id}
            className={cn(
              "playstyle-card cursor-pointer bg-white bg-opacity-60 p-3 md:p-4 rounded-lg shadow-md",
              character.playStyle === style.id 
                ? "border-2 border-amber-500" 
                : "border-2 border-slate-900 border-opacity-20"
            )}
            onClick={() => handlePlayStyleSelect(style.id)}
          >
            <div className="flex items-center mb-2 md:mb-3">
              <div className="flex-shrink-0">
                {style.icon}
              </div>
              <h3 className="font-cinzel text-base md:text-xl font-semibold text-slate-900">{style.title}</h3>
            </div>
            <p className="text-slate-900 text-sm md:text-base">{style.description}</p>
            <div className="mt-3 md:mt-4 grid grid-cols-3 gap-1 md:gap-2 text-xs md:text-sm">
              {style.tags.map((tag, index) => (
                <span key={index} className={`${style.tagColor} px-1 md:px-2 py-1 rounded font-cinzel text-center truncate`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Character Style Preference Sliders */}
      <div className="bg-white bg-opacity-50 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
        <h3 className="font-medieval text-lg md:text-xl text-slate-900 mb-3 md:mb-4">Ajuste sua preferência de estilo:</h3>
        
        <div className="mb-3 md:mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">Corpo a corpo</span>
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">À distância</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={character.combatStyle || 5} 
            onChange={(e) => handleSliderChange(e, "combatStyle")}
            className="w-full"
          />
        </div>
        
        <div className="mb-3 md:mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">Força bruta</span>
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">Agilidade</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={character.strengthAgility || 5} 
            onChange={(e) => handleSliderChange(e, "strengthAgility")}
            className="w-full"
          />
        </div>
        
        <div className="mb-3 md:mb-4">
          <div className="flex justify-between mb-1">
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">Comunicação</span>
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">Conhecimento</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={character.charismaIntelligence || 5} 
            onChange={(e) => handleSliderChange(e, "charismaIntelligence")}
            className="w-full"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">Estruturado</span>
            <span className="font-cinzel text-slate-900 text-xs md:text-sm">Improvisador</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={character.planningImprovisation || 5} 
            onChange={(e) => handleSliderChange(e, "planningImprovisation")}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Roleplay Questions */}
      <div className="bg-white bg-opacity-50 p-4 md:p-6 rounded-lg mb-6 md:mb-8">
        <h3 className="font-medieval text-lg md:text-xl text-slate-900 mb-3 md:mb-4">Como você reagiria a estas situações?</h3>
        
        <div className="mb-5 md:mb-6">
          <p className="text-slate-900 text-sm md:text-base mb-2 md:mb-3">Seu grupo encontra uma porta trancada em uma masmorra. Você:</p>
          <RadioGroup 
            value={doorScenario} 
            onValueChange={(value) => handleScenarioChange('door', value)}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
          >
            {[
              { value: "force", label: "Tenta derrubar a porta com força" },
              { value: "pick", label: "Tenta abrir a fechadura com habilidade" },
              { value: "magic", label: "Usa magia para abrir ou contornar a porta" },
              { value: "find", label: "Procura uma passagem secreta ou alternativa" }
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-2 md:p-3 bg-white bg-opacity-60 rounded-lg hover:shadow-md transition-shadow">
                <RadioGroupItem value={option.value} id={`door-${option.value}`} />
                <Label htmlFor={`door-${option.value}`} className="flex-1 cursor-pointer text-slate-900 text-sm md:text-base">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <p className="text-slate-900 text-sm md:text-base mb-2 md:mb-3">Durante uma negociação com um nobre local, você prefere:</p>
          <RadioGroup 
            value={nobleScenario} 
            onValueChange={(value) => handleScenarioChange('noble', value)}
            className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3"
          >
            {[
              { value: "charm", label: "Usar seu charme e carisma para persuadi-lo" },
              { value: "intimidate", label: "Intimidar sutilmente para conseguir o que quer" },
              { value: "logic", label: "Usar lógica e fatos para apresentar argumentos" },
              { value: "listen", label: "Observar e deixar outros do grupo falarem" }
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2 p-2 md:p-3 bg-white bg-opacity-60 rounded-lg hover:shadow-md transition-shadow">
                <RadioGroupItem value={option.value} id={`noble-${option.value}`} />
                <Label htmlFor={`noble-${option.value}`} className="flex-1 cursor-pointer text-slate-900 text-sm md:text-base">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default PlayStyleStep;
