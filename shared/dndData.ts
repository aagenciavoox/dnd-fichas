// Data definitions for D&D 5e races, classes, skills, etc.

export const races = [
  {
    name: "Humano",
    shortDesc: "Adaptáveis e ambiciosos, os humanos são versáteis e ambiciosos.",
    traits: ["Versatilidade", "Ambição", "Adaptação"],
    bonuses: "+1 em todos os atributos"
  },
  {
    name: "Elfo",
    shortDesc: "Graciosos e longevos, os elfos são mestres da magia e sabedoria ancestral.",
    traits: ["Transe", "Visão no Escuro", "Sentidos Aguçados"],
    bonuses: "+2 Destreza, +1 Inteligência"
  },
  {
    name: "Anão",
    shortDesc: "Robustos e resistentes, os anãos são excelentes artesãos e combatentes.",
    traits: ["Resistência Anã", "Treinamento em Combate", "Especialista em Pedra"],
    bonuses: "+2 Constituição, +1 Sabedoria"
  },
  {
    name: "Halfling",
    shortDesc: "Pequenos e ágeis, os halflings são sortudos e amigáveis.",
    traits: ["Sorte", "Bravura", "Agilidade"],
    bonuses: "+2 Destreza, +1 Carisma"
  },
  {
    name: "Meio-Orc",
    shortDesc: "Fortes e intimidadores, os meio-orcs são guerreiros formidáveis.",
    traits: ["Ameaçador", "Resistência Incansável", "Ataques Selvagens"],
    bonuses: "+2 Força, +1 Constituição"
  }
];

export const classes = [
  {
    name: "Bárbaro",
    shortDesc: "Guerreiros ferozes que canalizam sua fúria interior em combate.",
    keyAbilities: ["Força", "Constituição"],
    hitDie: "d12",
    armor: "Leve e Média",
    weapons: "Todas as armas comuns e marciais"
  },
  {
    name: "Bardo",
    shortDesc: "Artistas versáteis que utilizam música e magia para inspirar aliados.",
    keyAbilities: ["Carisma", "Destreza"],
    hitDie: "d8",
    armor: "Leve",
    weapons: "Armas simples, bestas de mão, espadas longas, rapieiras, espadas curtas"
  },
  {
    name: "Clérigo",
    shortDesc: "Campeões devotos que canalizam o poder divino para proteger e curar.",
    keyAbilities: ["Sabedoria", "Carisma"],
    hitDie: "d8",
    armor: "Leve, Média e Escudos",
    weapons: "Todas as armas simples"
  },
  {
    name: "Druida",
    shortDesc: "Guardiões da natureza que convocam o poder elementar e transformam-se em animais.",
    keyAbilities: ["Sabedoria", "Constituição"],
    hitDie: "d8",
    armor: "Leve, Média e Escudos (não metálicos)",
    weapons: "Clavas, adagas, dardos, azagaias, maças, bordões, cimitarras, foices, fundas e lanças"
  },
  {
    name: "Guerreiro",
    shortDesc: "Mestres do combate treinados em diversas técnicas e estilos de luta.",
    keyAbilities: ["Força", "Constituição"],
    hitDie: "d10",
    armor: "Todas as armaduras e escudos",
    weapons: "Todas as armas simples e marciais"
  },
  {
    name: "Monge",
    shortDesc: "Artistas marciais que aperfeiçoam o corpo como arma e a mente como escudo.",
    keyAbilities: ["Destreza", "Sabedoria"],
    hitDie: "d8",
    armor: "Nenhuma",
    weapons: "Armas simples e espadas curtas"
  },
  {
    name: "Paladino",
    shortDesc: "Cavaleiros sagrados que juram proteger a justiça e destruir o mal.",
    keyAbilities: ["Força", "Carisma"],
    hitDie: "d10",
    armor: "Todas as armaduras e escudos",
    weapons: "Todas as armas simples e marciais"
  },
  {
    name: "Guardião",
    shortDesc: "Caçadores e rastreadores habilidosos que dominam o ambiente selvagem.",
    keyAbilities: ["Destreza", "Sabedoria"],
    hitDie: "d10",
    armor: "Leve e Média",
    weapons: "Armas simples e marciais"
  },
  {
    name: "Ladino",
    shortDesc: "Especialistas em furtividade e astúcia que superam obstáculos com habilidade.",
    keyAbilities: ["Destreza", "Inteligência"],
    hitDie: "d8",
    armor: "Leve",
    weapons: "Armas simples, bestas de mão, espadas longas, rapieiras, espadas curtas"
  },
  {
    name: "Feiticeiro",
    shortDesc: "Conjuradores natos cujo poder mágico vem de uma linhagem ancestral.",
    keyAbilities: ["Carisma", "Constituição"],
    hitDie: "d6",
    armor: "Nenhuma",
    weapons: "Adagas, dardos, fundas, bordões, bestas leves"
  },
  {
    name: "Bruxo",
    shortDesc: "Místicos que fazem pactos com entidades poderosas em troca de magia.",
    keyAbilities: ["Carisma", "Constituição"],
    hitDie: "d8",
    armor: "Leve",
    weapons: "Armas simples"
  },
  {
    name: "Mago",
    shortDesc: "Estudiosos que dominam a magia através de anos de estudo e prática.",
    keyAbilities: ["Inteligência", "Constituição"],
    hitDie: "d6",
    armor: "Nenhuma",
    weapons: "Adagas, dardos, fundas, bordões, bestas leves"
  }
];

export const skills = [
  {
    name: "Acrobacia",
    attribute: "destreza",
    description: "Manter o equilíbrio, saltos e piruetas."
  },
  {
    name: "Arcanismo",
    attribute: "intelligence",
    description: "Conhecimento sobre magia e itens mágicos."
  },
  {
    name: "Atletismo",
    attribute: "strength",
    description: "Escalada, salto e natação."
  },
  {
    name: "Atuação",
    attribute: "charisma",
    description: "Entreter uma audiência com música, dança ou atuação."
  },
  {
    name: "Enganação",
    attribute: "charisma",
    description: "Mentir convincentemente ou enganar outros."
  },
  {
    name: "Furtividade",
    attribute: "dexterity",
    description: "Esconder-se ou mover-se sem ser notado."
  },
  {
    name: "História",
    attribute: "intelligence",
    description: "Recordar informações sobre eventos históricos."
  },
  {
    name: "Intimidação",
    attribute: "charisma",
    description: "Influenciar outros através de ameaças."
  },
  {
    name: "Intuição",
    attribute: "wisdom",
    description: "Determinar as intenções verdadeiras de uma criatura."
  },
  {
    name: "Investigação",
    attribute: "intelligence",
    description: "Procurar pistas e fazer deduções."
  },
  {
    name: "Lidar com Animais",
    attribute: "wisdom",
    description: "Acalmar, treinar ou controlar animais."
  },
  {
    name: "Medicina",
    attribute: "wisdom",
    description: "Estabilizar um companheiro ou diagnosticar uma doença."
  },
  {
    name: "Natureza",
    attribute: "intelligence",
    description: "Conhecimento sobre terreno, plantas e animais."
  },
  {
    name: "Percepção",
    attribute: "wisdom",
    description: "Detectar a presença de algo ou notar detalhes."
  },
  {
    name: "Persuasão",
    attribute: "charisma",
    description: "Influenciar atitudes e comportamentos através do diálogo."
  },
  {
    name: "Prestidigitação",
    attribute: "dexterity",
    description: "Manipular objetos com destreza manual."
  },
  {
    name: "Religião",
    attribute: "intelligence",
    description: "Conhecimento sobre divindades, ritos e orações."
  },
  {
    name: "Sobrevivência",
    attribute: "wisdom",
    description: "Seguir rastros, caçar e encontrar comida na natureza."
  }
];

export const backgrounds = [
  {
    name: "Acólito",
    description: "Você serviu como um assistente em um templo ou ordem religiosa.",
    feature: "Abrigo dos Fiéis"
  },
  {
    name: "Artesão de Guilda",
    description: "Você é um membro habilidoso de uma guilda de artesãos.",
    feature: "Associação à Guilda"
  },
  {
    name: "Artista",
    description: "Você vive para emocionar uma plateia como músico, ator ou contador de histórias.",
    feature: "Pela Fama"
  },
  {
    name: "Charlatão",
    description: "Você é um manipulador nato, enganando outros para seu próprio benefício.",
    feature: "Identidade Falsa"
  },
  {
    name: "Criminoso",
    description: "Você viveu uma vida de crime antes de se tornar um aventureiro.",
    feature: "Contato Criminal"
  },
  {
    name: "Eremita",
    description: "Você viveu em isolamento, buscando iluminação pessoal ou espiritual.",
    feature: "Descoberta"
  },
  {
    name: "Herói do Povo",
    description: "Você vem de origem humilde, mas está destinado à grandeza.",
    feature: "Hospitalidade Rústica"
  },
  {
    name: "Nobre",
    description: "Você nasceu em uma família de privilégios e influência social.",
    feature: "Posição Privilegiada"
  },
  {
    name: "Órfão",
    description: "Você cresceu nas ruas, aprendendo a cuidar de si mesmo.",
    feature: "Conhecimento das Ruas"
  },
  {
    name: "Sábio",
    description: "Você dedicou sua vida ao estudo e conhecimento.",
    feature: "Pesquisador"
  },
  {
    name: "Soldado",
    description: "Você treinou como soldado e participou de combates militares.",
    feature: "Patente Militar"
  }
];
