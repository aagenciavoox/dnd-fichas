import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export function ProgressSteps({ steps, currentStep, onStepClick }: ProgressStepsProps) {
  return (
    <div className="flex justify-between mb-8 relative overflow-x-auto pb-2 md:overflow-visible">
      {/* Mobile view - current step indicator */}
      <div className="fixed top-0 left-0 right-0 bg-amber-100 py-2 px-4 text-center font-medieval text-primary border-b border-amber-200 md:hidden z-20">
        Passo {currentStep + 1}: {steps[currentStep].title}
      </div>
      
      {/* Progressive bar */}
      <div className="absolute top-1/2 h-1 transform -translate-y-1/2 bg-slate-900 bg-opacity-20 w-full z-0"></div>
      
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={cn(
            "progress-step relative z-10 flex flex-col items-center flex-shrink-0 mx-1 md:mx-0",
            index <= currentStep && "active"
          )}
          onClick={() => onStepClick && onStepClick(index)}
        >
          <div 
            className={cn(
              "step-number w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-medieval text-sm md:text-base", 
              index <= currentStep ? "bg-primary text-white" : "bg-slate-900 bg-opacity-20 text-slate-900",
              onStepClick && "cursor-pointer"
            )}
          >
            {index + 1}
          </div>
          <span className="text-slate-900 text-xs md:text-sm mt-1 md:mt-2 font-cinzel truncate max-w-[60px] text-center">{step.title}</span>
        </div>
      ))}
    </div>
  );
}
