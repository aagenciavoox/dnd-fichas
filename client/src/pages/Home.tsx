import { CharacterCreator } from "@/components/CharacterCreator";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-medieval text-white drop-shadow-lg mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-10 w-10 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2c-5.5 0-10 4.5-10 10a10 10 0 0 0 20 0c0-5.5-4.5-10-10-10Z" />
            <path d="M12 6V4" />
            <path d="m15 7-1.5-1.5" />
            <path d="M18 10h2" />
            <path d="m15 13 1.5 1.5" />
            <path d="M12 16v2" />
            <path d="m9 13-1.5 1.5" />
            <path d="M6 10H4" />
            <path d="m9 7 1.5-1.5" />
            <path d="M12.5 6.5c-4.5 7 1.5 10-1.5 14" />
          </svg>
          Criador de Personagens D&D
        </h1>
        <p className="text-white text-lg md:text-xl italic font-cinzel">Forje seu destino no mundo de Dungeons & Dragons</p>
      </header>
      
      <CharacterCreator />
      
      {/* Quick Help Widget */}
      <button className="fixed bottom-6 right-6 bg-amber-500 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </button>
    </div>
  );
}
