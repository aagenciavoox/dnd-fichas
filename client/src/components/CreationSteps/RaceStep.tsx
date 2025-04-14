import { Character } from "@shared/schema";
import { races } from "@shared/dndData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RaceStepProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const RaceStep = ({ character, onUpdateCharacter }: RaceStepProps) => {
  const [name, setName] = useState(character.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const confirmName = () => {
    onUpdateCharacter({ name });
  };

  const handleSelectRace = (race: string) => {
    onUpdateCharacter({ race });
    
    // Apply racial ability score increases based on selected race
    let attributes = { ...character.attributes };
    
    switch (race) {
      case "Humano":
        // Humans get +1 to all stats
        Object.keys(attributes).forEach(attr => {
          attributes[attr as keyof typeof attributes] += 1;
        });
        break;
      case "Elfo":
        // Elves get +2 Dexterity, +1 Intelligence
        attributes.dexterity += 2;
        attributes.intelligence += 1;
        break;
      case "Anão":
        // Dwarves get +2 Constitution, +1 Wisdom
        attributes.constitution += 2;
        attributes.wisdom += 1; 
        break;
      case "Halfling":
        // Halflings get +2 Dexterity, +1 Charisma
        attributes.dexterity += 2;
        attributes.charisma += 1;
        break;
      case "Meio-Orc":
        // Half-Orcs get +2 Strength, +1 Constitution
        attributes.strength += 2;
        attributes.constitution += 1;
        break;
    }
    
    onUpdateCharacter({ attributes });
  };

  return (
    <div>
      <h2 className="text-3xl font-medieval text-primary mb-4">Escolha sua Raça e Nome</h2>
      <p className="text-slate-900 mb-6">Cada raça oferece diferentes bônus raciais e características únicas.</p>
      
      {/* Character Name Input */}
      <div className="bg-white bg-opacity-50 p-6 rounded-lg mb-8">
        <Label htmlFor="character-name" className="text-xl font-medieval text-slate-900 block mb-3">
          Como seu herói se chama?
        </Label>
        <div className="flex gap-3 items-center">
          <Input
            id="character-name"
            placeholder="Digite o nome do seu personagem"
            value={name}
            onChange={handleNameChange}
            className="bg-white/70 border-amber-500/30 focus-visible:ring-amber-500"
          />
          <Button 
            onClick={confirmName}
            size="sm"
            variant="outline"
            className="shrink-0"
          >
            Confirmar
          </Button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {races.map((race) => (
          <Card 
            key={race.name}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md border-2",
              character.race === race.name 
                ? "border-amber-500" 
                : "border-slate-200 hover:border-amber-500/50"
            )}
            onClick={() => handleSelectRace(race.name)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="font-cinzel text-lg">{race.name}</CardTitle>
              <CardDescription>{race.shortDesc}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                {race.traits.map((trait, index) => (
                  <span key={index} className="text-xs bg-amber-500/10 text-amber-700 px-2 py-1 rounded-full">
                    {trait}
                  </span>
                ))}
              </div>
              <div className="text-sm text-slate-700">
                <strong>Bônus Raciais:</strong> {race.bonuses}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button 
                variant={character.race === race.name ? "default" : "outline"} 
                size="sm" 
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectRace(race.name);
                }}
              >
                {character.race === race.name ? "Selecionado" : "Escolher"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RaceStep;
