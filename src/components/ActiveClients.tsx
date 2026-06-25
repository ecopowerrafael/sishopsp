import { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, ChevronRight, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'privados', label: 'Hospitais Privados' },
  { id: 'sus', label: 'Hospitais que atendem ao SUS' },
  { id: 'dia', label: 'Hospitais Dia' },
  { id: 'longa_permanencia', label: 'Longa Permanência & Dep. Química' },
  { id: 'psiquiatricos', label: 'Psiquiatria, Neuro & Retaguarda' },
  { id: 'oftalmo', label: 'Clínicas Oftalmológicas' },
  { id: 'onco_multi', label: 'Oncologia & Especialidades' },
  { id: 'acolhimento', label: 'Acolhimento PCD' },
  { id: 'seniores', label: 'Residenciais Seniores' }
];

const CLIENT_DATA: Record<string, { url: string; name: string }[]> = {
  privados: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2026/01/hospital-sao-francisco-patos.png', name: 'Hospital São Francisco' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Logo_HSM.avif', name: 'Hospital Santa Maria' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/logo-sms-vertical-azul-1024x277.webp', name: 'SMS Assistencial' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/life-1024x1024.png', name: 'Life Hospital' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/paragominas.png', name: 'Hospital Paragominas' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/prontil-1024x1024.png', name: 'Hospital Prontil' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/samaritano.png', name: 'Hospital Samaritano' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/santa-matilde.png', name: 'Hospital Santa Matilde' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/santa-sofia.png', name: 'Hospital Santa Sofia' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2026/01/Hospital-Santa-Marta-PE-1024x1024.jpg', name: 'Hospital Santa Marta' }
  ],
  sus: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Hospital-SantaTerezinha-e1743173494321.jpeg', name: 'Hospital Santa Terezinha' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2026/01/Hospital-Cura-Dars-1024x341.png', name: 'Hospital Cura D\'Ars' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2026/01/Santa-Case-Ipua.png', name: 'Santa Casa de Ipuã' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2026/01/Hospital-Nossa-Senhora-Mae-da-Igreja-1024x938.png', name: 'Hosp. N. Sra. Mãe da Igreja' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/CEGEN.png', name: 'CEGEN' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/HSVP-lafaiete-1024x202.png', name: 'Hospital HSVP Lafaiete' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/gpaci.png', name: 'GPACI Hospital Infantil' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/haoc.png', name: 'HAOC Hospital' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/fundacao_hospital_santa_lydia_logo.jpeg', name: 'Fundação Santa Lydia' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/aguas-formosas.png', name: 'Hospital Águas Formosas' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Logo-Santa-Casa-novo-1024x481.jpg', name: 'Santa Casa de Misericórdia' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/moriah.png', name: 'Hospital Moriah' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/pari.png', name: 'Hospital Pari' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/mario-gatti.png', name: 'Hospital Mário Gatti' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Logo-HCB-Caravalho-Beltrao.bmp', name: 'Hosp. Carvalho Beltrão' }
  ],
  dia: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/LOGO-AMC.png', name: 'AMC Hospital Dia' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/fases.png', name: 'Fases Recurso' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/one-day-hospital.jpg', name: 'One Day Hospital' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/sain-helen.png', name: 'Saint Helen' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/visualle-1024x1024.png', name: 'Hospital Dia Visualle' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/VitaVie-1024x1024.jpeg', name: 'VitaVie' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/celle.png', name: 'Celle' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/logo_alumni_site.png', name: 'Alumni Hospital' }
  ],
  longa_permanencia: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Cuidar-Clinica.png', name: 'Clínica Cuidar' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Flor-de-Lotus-1.png', name: 'Estância Flor de Lótus' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Gradiva.png', name: 'Gradiva' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Estancia-Bela-Vista.png', name: 'Estância Bela Vista' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Estancia-Maringa-1.png', name: 'Estância Maringá' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Estancia-Morro-Grande.png', name: 'Estância Morro Grande' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Nova-Alianca.png', name: 'Nova Aliança' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Recomeco-Clinica.png', name: 'Clínica Recomeço' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Recovery-Prime.png', name: 'Recovery Prime' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Resiliencia-Estancia.png', name: 'Estância Resiliência' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Restaurar.png', name: 'Clínica Restaurar' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/07/WhatsApp-Image-2025-07-04-at-12.04.01.jpeg', name: 'Estância Viva' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Villa-Vita.png', name: 'Villa Vita' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2026/01/Clinica-Arvore-da-Vida-1018x1024.jpeg', name: 'Clínica Árvore da Vida' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Atos-Vida.png', name: 'Atos Vida' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Bem-Viver-Psiquiatria.png', name: 'Bem Viver Psiquiatria' }
  ],
  psiquiatricos: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Hospital-Cruz-Verde.png', name: 'Hospital Cruz Verde' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Francisca-Julia-2.png', name: 'Francisca Júlia' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Gedor-Silveira.png', name: 'Gedor Silveira' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Instituto-Indaia.png', name: 'Instituto Indaiá' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Itupeva-1.png', name: 'Itupeva Recurso' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Vivencia-Psiquiatria.png', name: 'Vivência Psiquiatria' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/LaRavardiere.png', name: 'La Ravardiere' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Cantinho-do-Ceu-1.png', name: 'Cantinho do Céu' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Reger-hospital.png', name: 'Reger Hospital' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Residence-Care.png', name: 'Residence Care' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Serenity.png', name: 'Serenity' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/ritinha-prates.png', name: 'Ritinha Prates' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/ajgmais.png', name: 'AJG Mais' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/CSM-Caxias-do-Sul.png', name: 'CSM Caxias do Sul' }
  ],
  oftalmo: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/harfuch-1024x1024.png', name: 'Oftalmologia Harfuch' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/logo-phd-piumhi.png', name: 'PHD Piumhi' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/raskin.png', name: 'Raskin' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/AZUL_SAUDE.jpg', name: 'Azul Saúde' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/ibv.png', name: 'IBV' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/hospital-mira.webp', name: 'Hospital Mira' }
  ],
  onco_multi: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/clinica-universitaria-1024x900.png', name: 'Clínica Universitária' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/cto-pirassununga.png', name: 'CTO Pirassununga' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/davita.png', name: 'DaVita' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/gastroclinic.png', name: 'Gastroclinic' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/meirelles.png', name: 'Meirelles' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/provida-1024x1024.png', name: 'ProVida' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/santapelle.png', name: 'Santa Pelle' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/stachewski.png', name: 'Stachewski' }
  ],
  acolhimento: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/PPA-Projeto-Pro-autista.avif', name: 'Projeto Pró-Autista' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/pro-reintegracao-1.png', name: 'Pró-Reintegração' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2026/01/Somos-do-bem.png', name: 'Somos do Bem' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/AMDE-Sorocaba.png', name: 'AMDE Sorocaba' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/apae-aracatuba.png', name: 'APAE Araçatuba' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/apae-mirandopoles.png', name: 'APAE Mirandópolis' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/casa-de-davi.png', name: 'Casa de Davi' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/despetar-instituto.png', name: 'Despertar Instituto' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Associacao-Espirta-Jesus-Caridade.png', name: 'Jesus Caridade' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Lumen-Et-fides.png', name: 'Lumen Et Fides' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/maria-claro.png', name: 'Maria Claro' }
  ],
  seniores: [
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Vila-Sao-Vicente-Paulo.png', name: 'Vila São Vicente de Paulo' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Vila-Ipe-1.png', name: 'Vila Ipê' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/IASCJ-Marilia.jpg', name: 'IASCJ Marília' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Casa-de-Cecilia-1.png', name: 'Casa de Cecília' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/recanto-dos-avos-1024x1024.png', name: 'Recanto dos Avós' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Recanto-dos-Velhinhos-Valinhos.png', name: 'Recanto dos Velhinhos Valinhos' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Sao-Vicente-de-Paulo.png', name: 'São Vicente de Paulo' },
    { url: 'https://sishosp.com.br/wp-content/uploads/2025/03/Casa-Videiras.png', name: 'Casa Videiras' }
  ]
};

// Flatten all items into single list for "todos"
const ALL_LOGOS: { url: string; name: string }[] = [];
Object.keys(CLIENT_DATA).forEach((key) => {
  CLIENT_DATA[key].forEach((logo) => {
    // Prevent duplicates in "todos" array just to keep it clean
    if (!ALL_LOGOS.find(l => l.url === logo.url)) {
      ALL_LOGOS.push(logo);
    }
  });
});

export default function ActiveClients() {
  const [activeTab, setActiveTab] = useState('todos');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cycle the tabs automatically
  useEffect(() => {
    if (!isAutoPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const cycleInterval = 8000; // Switch category every 8 seconds
    const progressUpdateStep = 100; // Update progress bar every 100ms
    const stepRatio = progressUpdateStep / cycleInterval * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Trigger next tab!
          setActiveTab((currentTab) => {
            const index = CATEGORIES.findIndex(c => c.id === currentTab);
            const nextIndex = (index + 1) % CATEGORIES.length;
            return CATEGORIES[nextIndex].id;
          });
          return 0;
        }
        return prev + stepRatio;
      });
    }, progressUpdateStep);

    intervalRef.current = timer;

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isAutoPlaying]);

  // Handle manual tab change (pauses autoplay temporarily or resets it)
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setProgress(0);
    // Pause autoplay momentarily on user click so they can inspect, then resume or keep active
    setIsAutoPlaying(false);
    // Restart autoplay after 15 seconds of inactivity
    const timeout = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 15000);
    return () => clearTimeout(timeout);
  };

  // Get active logos to show in marquee
  const getLogosForCurrentTab = () => {
    const list = activeTab === 'todos' ? ALL_LOGOS : (CLIENT_DATA[activeTab] || []);
    if (list.length === 0) return [];
    
    // Duplicate items to ensure there are enough logos to fill the continuous marquee without layout gaps
    let displayList = [...list];
    while (displayList.length < 24) {
      displayList = [...displayList, ...list];
    }
    return displayList;
  };

  const currentLogos = getLogosForCurrentTab();

  return (
    <section className="py-12 bg-slate-50/50 border-y border-slate-100 text-center overflow-hidden" id="clientes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <span className="inline-flex items-center gap-1.5 text-teal-600 font-display font-bold text-xs uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100/50 mb-3 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          Presença Nacional de Confiança
        </span>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Mais de uma centena de hospitais, clínicas, instituições de acolhimento e residenciais seniores brasileiros usam a Plataforma de Gestão e Análises Estratégicas SisHOSP
        </h2>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400 px-1 font-semibold uppercase tracking-wider">
          <span>Filtrar por Especialidade</span>
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-900"
            title={isAutoPlaying ? "Pausar rotação automática" : "Iniciar rotação automática"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3 h-3 text-teal-600" />
                <span className="text-[10px]">Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400" />
                <span className="text-[10px]">Girar Automático</span>
              </>
            )}
          </button>
        </div>

        {/* Categories Tab Pill List */}
        <div className="flex overflow-x-auto pb-2 gap-1.5 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className={`snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[11px] font-bold transition-all border relative overflow-hidden ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/10'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span>{cat.label}</span>
                {isActive && isAutoPlaying && (
                  <div 
                    className="absolute bottom-0 left-0 h-0.5 bg-white/40 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sleek Infinite Moving Logo Marquee Track */}
      <div className="relative w-full flex items-center justify-center py-5 bg-white/60 border-y border-slate-100/70 select-none">
        
        {/* Transparent Mask Overlays for premium fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="w-full overflow-hidden">
          <div className="animate-marquee gap-6 md:gap-10 flex flex-row items-center px-4" key={activeTab}>
            {currentLogos.map((item, idx) => (
              <div 
                key={`${item.url}-${idx}`} 
                className="flex flex-col items-center justify-center shrink-0 h-16 w-32 sm:w-40 px-3 bg-white border border-slate-100 rounded-xl hover:border-teal-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer relative"
                title={item.name}
              >
                <div className="h-10 w-full flex items-center justify-center">
                  <img 
                    src={item.url} 
                    alt={item.name}
                    className="max-h-9 max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Failover if logo does not render correctly
                      (e.target as HTMLElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent) {
                        const textNode = document.createElement('span');
                        textNode.className = 'text-[9px] font-bold text-slate-500 text-center tracking-tight line-clamp-2 uppercase px-1 leading-none';
                        textNode.innerText = item.name;
                        parent.appendChild(textNode);
                      }
                    }}
                  />
                </div>
                <span className="text-[8px] text-slate-400 group-hover:text-teal-600 font-bold transition-colors truncate w-full mt-1.5 px-1 leading-none text-center">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
