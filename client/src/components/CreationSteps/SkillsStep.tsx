import { Character } from "@shared/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getClassSkills, getSkillModifier } from "@/lib/characterUtils";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { skills } from "@shared/dndData";

interface SkillsStepProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const SkillsStep = ({ character, onUpdateCharacter }: SkillsStepProps) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(character.skills || []);
  const [maxSkills, setMaxSkills] = useState(2);
  
  useEffect(() => {
    // Determine number of skills based on class
    if (character.class) {
      switch (character.class) {
        case "Ladino":
          setMaxSkills(4);
          break;
        case "Bardo":
          setMaxSkills(3);
          break;
        case "Guardião":
        case "Druida":
          setMaxSkills(3);
          break;
        default:
          setMaxSkills(2);
      }
    }
  }, [character.class]);

  useEffect(() => {
    // Update skills in character object when selection changes
    onUpdateCharacter({ skills: selectedSkills });
  }, [selectedSkills, onUpdateCharacter]);

  const handleSkillToggle = (skill: string, checked: boolean) => {
    if (checked) {
      if (selectedSkills.length < maxSkills) {
        setSelectedSkills([...selectedSkills, skill]);
      }
    } else {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    }
  };

  const autoSelectSkills = () => {
    const recommendedSkills = getClassSkills(character.class, maxSkills);
    setSelectedSkills(recommendedSkills);
  };

  return (
    <div>
      <h2 className="text-3xl font-medieval text-primary mb-4">Escolha suas Perícias</h2>
      <p className="text-slate-900 mb-6">
        Selecione até {maxSkills} perícias nas quais seu personagem será treinado. 
        Perícias treinadas recebem um bônus de proficiência +2.
      </p>
      
      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Cada perícia está associada a um atributo. Quanto maior o valor do atributo, melhor você será nessa perícia.
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={autoSelectSkills}
          disabled={!character.class}
        >
          Sugerir Perícias
        </Button>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => {
          const isChecked = selectedSkills.includes(skill.name);
          const modifier = getSkillModifier(character, skill);
          const formattedModifier = modifier >= 0 ? `+${modifier}` : modifier;
          
          return (
            <div 
              key={skill.name}
              className={`p-4 rounded-lg border ${isChecked ? 'bg-white border-amber-300' : 'bg-white/60 border-slate-200'}`}
            >
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id={`skill-${skill.name}`}
                  checked={isChecked}
                  onCheckedChange={(checked) => handleSkillToggle(skill.name, checked as boolean)}
                  disabled={!isChecked && selectedSkills.length >= maxSkills}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor={`skill-${skill.name}`}
                    className="font-cinzel font-medium cursor-pointer flex justify-between"
                  >
                    <span>{skill.name}</span>
                    <span className="text-slate-600 font-normal">
                      ({skill.attribute.slice(0, 3).toUpperCase()}) {formattedModifier}
                    </span>
                  </Label>
                  <p className="text-xs text-slate-600 mt-1">{skill.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsStep;
