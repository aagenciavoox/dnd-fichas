import { Character } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { getModifier, getRecommendedAttributes } from "@/lib/characterUtils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AttributesStepProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const AttributesStep = ({ character, onUpdateCharacter }: AttributesStepProps) => {
  const [remainingPoints, setRemainingPoints] = useState(27);
  const [showRecommendation, setShowRecommendation] = useState(false);
  
  const attributes = [
    { key: 'strength', name: 'Força', abbr: 'FOR', description: 'Capacidade física, poder muscular e impacto no combate corpo a corpo' },
    { key: 'dexterity', name: 'Destreza', abbr: 'DES', description: 'Agilidade, reflexos, equilíbrio e precisão com armas à distância' },
    { key: 'constitution', name: 'Constituição', abbr: 'CON', description: 'Saúde, vigor, resistência física e pontos de vida' },
    { key: 'intelligence', name: 'Inteligência', abbr: 'INT', description: 'Capacidade de raciocínio, memória e conhecimento arcano' },
    { key: 'wisdom', name: 'Sabedoria', abbr: 'SAB', description: 'Percepção, intuição, força de vontade e conexão divina' },
    { key: 'charisma', name: 'Carisma', abbr: 'CAR', description: 'Força de personalidade, liderança e habilidade social' }
  ];

  // Point Buy system costs
  const getPointCost = (value: number) => {
    if (value <= 13) return value - 8;
    if (value === 14) return 7;
    if (value === 15) return 9;
    return 0;
  };

  const calculateUsedPoints = () => {
    return Object.values(character.attributes).reduce((sum, value) => {
      return sum + getPointCost(value);
    }, 0);
  };

  const handleAttributeChange = (attribute: string, value: number[]) => {
    const newValue = value[0];
    const attributeKey = attribute as keyof typeof character.attributes;
    
    // Calculate point difference
    const oldCost = getPointCost(character.attributes[attributeKey]);
    const newCost = getPointCost(newValue);
    const pointDifference = newCost - oldCost;
    
    // Check if we have enough points
    if (remainingPoints - pointDifference < 0) return;
    
    // Update attribute and remaining points
    const newAttributes = { ...character.attributes, [attributeKey]: newValue };
    onUpdateCharacter({ attributes: newAttributes });
    setRemainingPoints(remainingPoints - pointDifference);
  };

  const resetAttributes = () => {
    onUpdateCharacter({
      attributes: {
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8
      }
    });
    setRemainingPoints(27);
  };

  const applyRecommendedAttributes = () => {
    if (!character.class || !character.playStyle) return;
    
    const recommendedAttributes = getRecommendedAttributes(character.class, character.playStyle);
    onUpdateCharacter({ attributes: recommendedAttributes });
    
    // Calculate remaining points after applying recommendations
    const usedPoints = Object.values(recommendedAttributes).reduce((sum, value) => {
      return sum + getPointCost(value);
    }, 0);
    
    setRemainingPoints(27 - usedPoints);
    setShowRecommendation(true);
  };

  // Roll random attributes (4d6 drop lowest)
  const rollRandomAttributes = () => {
    const rollStat = () => {
      const rolls = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
      rolls.sort((a, b) => a - b);
      return rolls.slice(1).reduce((sum, roll) => sum + roll, 0);
    };
    
    const newAttributes = {
      strength: rollStat(),
      dexterity: rollStat(),
      constitution: rollStat(),
      intelligence: rollStat(),
      wisdom: rollStat(),
      charisma: rollStat()
    };
    
    onUpdateCharacter({ attributes: newAttributes });
    setRemainingPoints(0); // Disable point buy when using rolls
  };

  return (
    <div>
      <h2 className="text-3xl font-medieval text-primary mb-4">Defina seus Atributos</h2>
      <p className="text-slate-900 mb-6">
        Distribua os pontos nos atributos que definem as capacidades do seu personagem. 
        Você tem <span className="font-bold">{remainingPoints}</span> pontos para gastar.
      </p>
      
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <Button variant="outline" onClick={resetAttributes}>
          Reiniciar (8 em cada)
        </Button>
        <Button 
          variant="outline" 
          onClick={applyRecommendedAttributes}
          disabled={!character.class || !character.playStyle}
        >
          Sugestão Automática
        </Button>
        <Button variant="outline" onClick={rollRandomAttributes}>
          Rolar Aleatoriamente
        </Button>
      </div>
      
      {showRecommendation && (
        <Alert className="mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 14 4-4" />
            <path d="M3.34 19a10 10 0 1 1 17.32 0" />
          </svg>
          <AlertTitle>Atributos Sugeridos!</AlertTitle>
          <AlertDescription>
            Aplicamos os melhores atributos para um {character.class} com estilo de jogo {character.playStyle}.
            Você ainda pode ajustar manualmente se desejar.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {attributes.map(attr => (
          <Card key={attr.key}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="font-cinzel">{attr.name} ({attr.abbr})</CardTitle>
                <div className="text-2xl font-bold text-primary flex items-center gap-2">
                  {character.attributes[attr.key as keyof typeof character.attributes]}
                  <span className="text-sm text-slate-600">
                    ({getModifier(character.attributes[attr.key as keyof typeof character.attributes]) >= 0 ? '+' : ''}
                    {getModifier(character.attributes[attr.key as keyof typeof character.attributes])})
                  </span>
                </div>
              </div>
              <CardDescription>{attr.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Slider
                defaultValue={[character.attributes[attr.key as keyof typeof character.attributes]]}
                max={15}
                min={8}
                step={1}
                onValueChange={(value) => handleAttributeChange(attr.key, value)}
                disabled={remainingPoints <= 0 && character.attributes[attr.key as keyof typeof character.attributes] < value[0]}
              />
            </CardContent>
            <CardFooter className="pt-0 text-xs text-slate-500">
              <div className="flex justify-between w-full">
                <span>8</span>
                <span>15</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AttributesStep;
