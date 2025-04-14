import { useState } from "react";
import { CharacterPreview } from "./CharacterPreview";
import { ProgressSteps } from "@/components/ui/progress-steps";
import PlayStyleStep from "./CreationSteps/PlayStyleStep";
import RaceStep from "./CreationSteps/RaceStep";
import ClassStep from "./CreationSteps/ClassStep";
import AttributesStep from "./CreationSteps/AttributesStep";
import SkillsStep from "./CreationSteps/SkillsStep";
import FinalizeStep from "./CreationSteps/FinalizeStep";
import { Button } from "@/components/ui/button";
import { Character } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export const CharacterCreator = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [character, setCharacter] = useState<Character>({
    id: 0,
    name: "",
    race: "",
    class: "",
    level: 1,
    attributes: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    },
    playStyle: "",
    skills: [],
    equipment: [],
    spells: [],
    background: "",
    alignment: ""
  });

  const saveCharacterMutation = useMutation({
    mutationFn: async (characterData: Omit<Character, "id">) => {
      const response = await apiRequest("POST", "/api/characters", characterData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Personagem salvo com sucesso!",
        description: `Seu personagem ${data.name} foi salvo.`,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar personagem",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const steps = [
    { id: "style", title: "Estilo", component: PlayStyleStep },
    { id: "race", title: "Raça", component: RaceStep },
    { id: "class", title: "Classe", component: ClassStep },
    { id: "attributes", title: "Atributos", component: AttributesStep },
    { id: "skills", title: "Perícias", component: SkillsStep },
    { id: "finalize", title: "Finalizar", component: FinalizeStep }
  ];

  const handleUpdateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => ({ ...prev, ...updates }));
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Save character
      const { id, ...characterData } = character;
      saveCharacterMutation.mutate(characterData);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 pb-16 pt-8 md:pt-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="parchment-bg rounded-lg p-3 md:p-4 lg:p-6 lg:col-span-9 mt-8 md:mt-4">
          <ProgressSteps 
            steps={steps} 
            currentStep={currentStep} 
            onStepClick={(index) => setCurrentStep(index)} 
          />
          
          <div className="bg-amber-50/70 p-3 md:p-4 lg:p-6 rounded-lg border-2 border-slate-900/20 mt-6 md:mt-8">
            <CurrentStepComponent 
              character={character}
              onUpdateCharacter={handleUpdateCharacter}
            />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 0}
                className="font-cinzel w-full sm:w-auto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Anterior
              </Button>
              
              {/* Mobile-only character preview toggle */}
              <div className="block sm:hidden">
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setShowMobilePreview(!showMobilePreview)}
                >
                  {showMobilePreview ? 'Esconder Prévia' : 'Ver Prévia do Personagem'}
                </Button>
              </div>
              
              <Button
                onClick={handleNextStep}
                className="bg-primary text-white font-cinzel w-full sm:w-auto"
              >
                {currentStep === steps.length - 1 ? 'Salvar Personagem' : 'Próximo'}
                {currentStep < steps.length - 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </Button>
            </div>
            
            {/* Mobile preview when toggle is on */}
            {showMobilePreview && (
              <div className="mt-6 flex justify-center sm:hidden">
                <CharacterPreview character={character} />
              </div>
            )}
          </div>
        </div>

        {/* Character Preview for larger screens - now part of the grid layout instead of fixed */}
        <div className="hidden lg:block lg:col-span-3 self-start sticky top-8">
          <CharacterPreview character={character} />
        </div>
      </div>
    </div>
  );
};
