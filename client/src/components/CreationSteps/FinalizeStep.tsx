import { Character, CharacterAttributes } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEquipmentForClass, getSpellsForClass } from "@/lib/characterUtils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { backgrounds } from "@shared/dndData";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FinalizeStepProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const FinalizeStep = ({ character, onUpdateCharacter }: FinalizeStepProps) => {
  const [showBackgroundDialog, setShowBackgroundDialog] = useState(false);
  
  // Helper function to render attribute entries with proper typing
  const renderAttributeEntries = () => {
    if (!character.attributes) return null;
    
    const attrs = character.attributes as CharacterAttributes;
    return Object.keys(attrs).map(key => {
      const attrKey = key as keyof CharacterAttributes;
      const value = attrs[attrKey];
      const mod = Math.floor((value - 10) / 2);
      const formattedMod = mod >= 0 ? `+${mod}` : mod;
      const attrName = {
        strength: "Força",
        dexterity: "Destreza",
        constitution: "Constituição",
        intelligence: "Inteligência",
        wisdom: "Sabedoria",
        charisma: "Carisma"
      }[attrKey];
      
      return (
        <div key={key} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-1">
            <div className="text-white font-bold text-xl">{value}</div>
          </div>
          <div className="text-center">
            <div className="font-cinzel text-sm">{attrName}</div>
            <div className="text-slate-700 text-sm font-medium">{formattedMod}</div>
          </div>
        </div>
      );
    });
  };
  
  const exportCharacterMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/characters/export", { id: character.id });
      return response.blob();
    },
    onSuccess: (blob) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${character.name || 'personagem'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  });

  const handleExportPDF = () => {
    if (character.id) {
      exportCharacterMutation.mutate();
    }
  };

  const completeCharacter = () => {
    // Auto-generate equipment and spells if not already set
    if (!character.equipment || character.equipment.length === 0) {
      const equipment = getEquipmentForClass(character.class);
      onUpdateCharacter({ equipment });
    }
    
    if ((!character.spells || character.spells.length === 0) && 
        ["Mago", "Clérigo", "Druida", "Bardo", "Bruxo", "Feiticeiro", "Paladino"].includes(character.class)) {
      const spells = getSpellsForClass(character.class);
      onUpdateCharacter({ spells });
    }
  };

  // Ensure character has equipment and spells
  completeCharacter();

  const handleSelectBackground = (background: string) => {
    onUpdateCharacter({ background });
    setShowBackgroundDialog(false);
  };

  return (
    <div>
      <h2 className="text-3xl font-medieval text-primary mb-4">Finalize seu Personagem</h2>
      <p className="text-slate-900 mb-6">
        Revise os detalhes do seu personagem antes de finalizar. Você pode exportar a ficha para PDF ou imprimir.
      </p>
      
      <div className="bg-white bg-opacity-50 p-6 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-cinzel text-center md:text-left">
              {character.name || "Herói Sem Nome"}
            </h2>
            <p className="text-slate-700 text-center md:text-left">
              {character.race} - {character.class}, Nível {character.level}
            </p>
            <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
              <Badge variant="outline" className="bg-amber-50">
                {character.playStyle === "combat" && "Estilo: Combatente"}
                {character.playStyle === "magic" && "Estilo: Conjurador"}
                {character.playStyle === "support" && "Estilo: Suporte"}
                {character.playStyle === "stealth" && "Estilo: Furtivo"}
              </Badge>
              
              {character.background ? (
                <Badge variant="outline" className="bg-amber-50">
                  Antecedente: {character.background}
                </Badge>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowBackgroundDialog(true)}
                >
                  Escolher Antecedente
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="attributes" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="attributes">Atributos</TabsTrigger>
            <TabsTrigger value="skills">Perícias</TabsTrigger>
            <TabsTrigger value="equipment">Equipamento</TabsTrigger>
            <TabsTrigger value="spells">Magias</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attributes">
            <Card>
              <CardHeader>
                <CardTitle className="font-medieval">Atributos e Modificadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {renderAttributeEntries()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle className="font-medieval">Perícias Treinadas</CardTitle>
              </CardHeader>
              <CardContent>
                {character.skills && character.skills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {character.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2 p-2 bg-amber-50 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
                          <path d="m9 12 2 2 4-4" />
                        </svg>
                        <span className="font-cinzel">{skill}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 italic">Nenhuma perícia selecionada.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle className="font-medieval">Equipamento Inicial</CardTitle>
              </CardHeader>
              <CardContent>
                {character.equipment && character.equipment.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {character.equipment.map((item, index) => (
                      <li key={index} className="text-slate-800">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600 italic">Equipamento será gerado ao finalizar o personagem.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="spells">
            <Card>
              <CardHeader>
                <CardTitle className="font-medieval">Magias Conhecidas</CardTitle>
              </CardHeader>
              <CardContent>
                {character.spells && character.spells.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {character.spells.map((spell, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                          <circle cx="17" cy="7" r="5" />
                        </svg>
                        <span className="text-slate-800">{spell}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-slate-600 italic">
                    {["Mago", "Clérigo", "Druida", "Bardo", "Bruxo", "Feiticeiro", "Paladino"].includes(character.class) 
                      ? "Magias serão geradas ao finalizar o personagem."
                      : "Esta classe não possui magias iniciais."}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button 
          onClick={handleExportPDF}
          className="gap-2"
          disabled={!character.name || !character.race || !character.class}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12" />
            <path d="m8 11 4 4 4-4" />
            <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
          </svg>
          Exportar PDF
        </Button>
        <Button 
          variant="outline"
          className="gap-2" 
          onClick={() => window.print()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
            <path d="M6 9H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2" />
            <path d="M18 9h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
            <path d="M6 17h12a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
            <path d="M6 17v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" />
          </svg>
          Imprimir
        </Button>
      </div>
      
      <SelectBackgroundDialog 
        open={showBackgroundDialog}
        onOpenChange={setShowBackgroundDialog}
        backgrounds={backgrounds}
        onSelectBackground={handleSelectBackground}
      />
    </div>
  );
};

// Create a dialog component for background selection
interface SelectBackgroundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  backgrounds: Array<{name: string; description: string; feature: string}>;
  onSelectBackground: (background: string) => void;
}

const SelectBackgroundDialog = ({ 
  open, 
  onOpenChange, 
  backgrounds, 
  onSelectBackground 
}: SelectBackgroundDialogProps) => {
  return (
    <div className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center ${open ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-medieval text-primary mb-4">Escolha um Antecedente</h3>
        <p className="text-slate-600 mb-4">O antecedente representa a origem do seu personagem e sua vida antes de se tornar um aventureiro.</p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {backgrounds.map(bg => (
            <Card 
              key={bg.name}
              className="cursor-pointer hover:border-amber-500 transition-colors"
              onClick={() => onSelectBackground(bg.name)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="font-cinzel text-lg">{bg.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{bg.description}</p>
                <div className="mt-2 text-xs text-slate-500">
                  <strong>Características:</strong> {bg.feature}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinalizeStep;
