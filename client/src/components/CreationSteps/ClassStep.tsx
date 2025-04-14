import { Character } from "@shared/schema";
import { classes } from "@shared/dndData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { recommendClassesForPlayStyle } from "@/lib/characterUtils";

interface ClassStepProps {
  character: Character;
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

const ClassStep = ({ character, onUpdateCharacter }: ClassStepProps) => {
  const handleSelectClass = (className: string) => {
    onUpdateCharacter({ class: className });
  };

  // Get recommended classes based on play style and preferences
  const recommendedClasses = recommendClassesForPlayStyle(character.playStyle);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-medieval text-primary mb-2 md:mb-4">Escolha sua Classe</h2>
      <p className="text-slate-900 text-sm md:text-base mb-4 md:mb-6">A classe determina as habilidades e competências principais do seu personagem.</p>

      <Tabs defaultValue="all" className="mb-4 md:mb-6">
        <TabsList className="grid grid-cols-2 mb-4 md:mb-6 w-full">
          <TabsTrigger value="all" className="text-sm md:text-base">Todas as Classes</TabsTrigger>
          <TabsTrigger value="recommended" disabled={!character.playStyle} className="text-sm md:text-base">
            Recomendadas para Você
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {classes.map((classItem) => (
              <Card 
                key={classItem.name}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md border-2",
                  character.class === classItem.name 
                    ? "border-amber-500" 
                    : "border-slate-200 hover:border-amber-500/50"
                )}
                onClick={() => handleSelectClass(classItem.name)}
              >
                <CardHeader className="pb-1 md:pb-2 p-3 md:p-4 lg:p-6">
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-cinzel text-base md:text-lg">{classItem.name}</CardTitle>
                    {recommendedClasses.includes(classItem.name) && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] md:text-xs">
                        Recomendado
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs md:text-sm">{classItem.shortDesc}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2 md:pb-4 px-3 md:px-4 lg:px-6">
                  <div className="flex flex-wrap gap-1 md:gap-2 mb-1 md:mb-2">
                    {classItem.keyAbilities.map((ability, index) => (
                      <span key={index} className="text-[10px] md:text-xs bg-primary/10 text-primary px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                        {ability}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs md:text-sm text-slate-700 mt-1 md:mt-2">
                    <p><strong>Dado de Vida:</strong> {classItem.hitDie}</p>
                    <p><strong>Armaduras:</strong> {classItem.armor}</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 p-3 md:p-4 lg:p-6">
                  <Button 
                    variant={character.class === classItem.name ? "default" : "outline"} 
                    size="sm" 
                    className="w-full text-xs md:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectClass(classItem.name);
                    }}
                  >
                    {character.class === classItem.name ? "Selecionado" : "Escolher"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {classes
              .filter(classItem => recommendedClasses.includes(classItem.name))
              .map((classItem) => (
                <Card 
                  key={classItem.name}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md border-2",
                    character.class === classItem.name 
                      ? "border-amber-500" 
                      : "border-slate-200 hover:border-amber-500/50"
                  )}
                  onClick={() => handleSelectClass(classItem.name)}
                >
                  <CardHeader className="pb-1 md:pb-2 p-3 md:p-4 lg:p-6">
                    <div className="flex justify-between items-start">
                      <CardTitle className="font-cinzel text-base md:text-lg">{classItem.name}</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] md:text-xs">
                        Recomendado
                      </Badge>
                    </div>
                    <CardDescription className="text-xs md:text-sm">{classItem.shortDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 md:pb-4 px-3 md:px-4 lg:px-6">
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-1 md:mb-2">
                      {classItem.keyAbilities.map((ability, index) => (
                        <span key={index} className="text-[10px] md:text-xs bg-primary/10 text-primary px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                          {ability}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs md:text-sm text-slate-700 mt-1 md:mt-2">
                      <p><strong>Dado de Vida:</strong> {classItem.hitDie}</p>
                      <p><strong>Armaduras:</strong> {classItem.armor}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 p-3 md:p-4 lg:p-6">
                    <Button 
                      variant={character.class === classItem.name ? "default" : "outline"} 
                      size="sm" 
                      className="w-full text-xs md:text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectClass(classItem.name);
                      }}
                    >
                      {character.class === classItem.name ? "Selecionado" : "Escolher"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
          
          {recommendedClasses.length === 0 && (
            <div className="text-center p-4 md:p-6 lg:p-8 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-base md:text-lg font-cinzel text-amber-800 mb-1 md:mb-2">Nenhuma classe recomendada</h3>
              <p className="text-amber-700 text-sm md:text-base">
                Volte ao passo anterior e selecione um estilo de jogo para receber recomendações personalizadas.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassStep;
