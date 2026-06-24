import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Heart, Brain, Activity, ShieldCheck, HelpCircle, ArrowRight, ClipboardList, Smile, CalendarDays, BarChart4 } from 'lucide-react';
import { SolutionSector } from '../types';

interface SolutionsProps {
  onOpenDemo: (challenge?: string) => void;
}

export default function Solutions({ onOpenDemo }: SolutionsProps) {
  const [activeTab, setActiveTab] = useState<string>('autismo');

  const sectors: SolutionSector[] = [
    {
      id: 'autismo',
      title: 'Clínicas de Autismo (TEA) e ABA',
      badge: 'Prontuário Autismo Especializado',
      description: 'Estruturado especificamente para as complexidades da terapia ABA e do Transtorno do Espectro Autista. Diga adeus às planilhas manuais e gerencie objetivos e evolução com precisão científica.',
      features: [
        'Prontuário com Metas ABA integradas e acompanhamento gráfico de evolução.',
        'Registro de frequência de sessões com controle de assinaturas dos pais.',
        'Integração multiprofissional (Fonoaudiologia, TO, Psicologia, Psicopedagogia).',
        'Relatórios de evolução clínica automáticos para apresentação aos planos.',
        'Controle integrado de avaliações DSM-5 e escalas especializadas (CARS, VB-MAPP).'
      ],
      targetAudience: 'Para clínicas de intervenção comportamental, terapeutas ocupacionais e clínicas de autismo.',
      ctaText: 'Ver Prontuário ABA na prática',
      iconName: 'Brain'
    },
    {
      id: 'apae',
      title: 'APAEs e Instituições Filantrópicas',
      badge: 'Faturamento SUS BPA-I e APAC',
      description: 'Desenvolvido sob medida para apoiar as APAEs na conformidade fiscal, prestação de contas governamentais e automação completa de atendimentos com foco em faturamento sem desperdício de verba.',
      features: [
        'Faturamento SUS integrado de alta performance com geração de arquivos BPA-I e APAC.',
        'Controle estrito de teto financeiro e metas pactuadas com o gestor local.',
        'Organização de atendimentos em turmas e grupos pedagógicos/clínicos.',
        'Exportação facilitada de dados para prestação de contas em portais municipais e estaduais.',
        'Prontuário único do assistido com histórico integrado de saúde, educação e assistência social.'
      ],
      targetAudience: 'Para gerentes, faturistas, assistentes sociais e diretorias de APAEs no Brasil inteiro.',
      ctaText: 'Otimizar Minha APAE',
      iconName: 'Heart'
    },
    {
      id: 'cer',
      title: 'Reabilitação Física e CER (Centros Especializados)',
      badge: 'Fila de Espera SUS e Regulação',
      description: 'Lide com o alto volume de pacientes de reabilitação física, auditiva, visual e intelectual com inteligência. Organize as filas de espera oficiais e garanta presença audatável.',
      features: [
        'Fila de espera SUS inteligente com algoritmos de priorização por gravidade e idade.',
        'Controle de frequência integrado com sensores biométricos ou reconhecimento facial.',
        'Painel dinâmico de produtividade do profissional (tempo de consulta, ausências).',
        'Controle rigoroso de órteses, próteses e materiais especiais (OPM).',
        'Atendimentos em boxes individuais ou ginásios de fisioterapia com facilidade de evolução.'
      ],
      targetAudience: 'Para diretores de CER, Centros de Reabilitação Municipais e clínicas de Fisioterapia e Fonoaudiologia.',
      ctaText: 'Modernizar Centro de Reabilitação',
      iconName: 'Activity'
    },
    {
      id: 'convenios',
      title: 'Clínicas Gerais e Convênios',
      badge: 'Faturamento TISS e XML de Alta Performance',
      description: 'Automatize por completo o faturamento de planos de saúde, agilizando o envio de guias de consulta, SADT e reduzindo o absenteísmo de pacientes com lembretes inteligentes por WhatsApp.',
      features: [
        'Geração de arquivos XML no padrão TISS mais recente para todos os planos.',
        'Envio de lembretes automáticos e confirmações de consulta via WhatsApp.',
        'Controle financeiro de glosas retroativas por convênio ou profissional.',
        'Telemedicina integrada e segura de acordo com os padrões da CFM e LGPD.',
        'Gestão de coparticipação de consultas e procedimentos em tempo real.'
      ],
      targetAudience: 'Para clínicas médicas, policlínicas, consultórios e redes de atendimento convênio e particular.',
      ctaText: 'Reduzir Minhas Glosas TISS',
      iconName: 'ShieldCheck'
    }
  ];

  const activeSector = sectors.find(s => s.id === activeTab) || sectors[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Brain': return <Brain className="w-5 h-5 text-teal-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-emerald-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-600" />;
      default: return <ShieldCheck className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <section className="py-20 bg-white border-y border-slate-100" id="solucoes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-display font-bold text-xs uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100/50">
            Nossas Soluções Especializadas
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mt-4 mb-5">
            Um sistema cirurgicamente moldado para o seu perfil de atendimento
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Diferente de ERPs médicos genéricos, o Sishosp se adapta às exigências regulatórias do SUS e às metodologias clínicas mais avançadas do setor de reabilitação.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 bg-slate-50 p-2 rounded-2xl max-w-4xl mx-auto border border-slate-100" id="solutions-tab-container">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => setActiveTab(sector.id)}
              className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === sector.id
                  ? 'bg-white text-teal-950 shadow-md border border-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              {getIcon(sector.iconName)}
              {sector.title.split(' e ')[0]}
            </button>
          ))}
        </div>

        {/* Active Tab Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-slate-50/50 rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-100"
            id={`solution-panel-${activeTab}`}
          >
            {/* Left Column: Descriptions and Features */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="bg-teal-50 text-teal-700 border border-teal-100 text-xs font-bold font-display px-3 py-1 rounded-md mb-4 uppercase">
                {activeSector.badge}
              </span>
              
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-4">
                {activeSector.title}
              </h3>
              
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {activeSector.description}
              </p>

              <div className="w-full space-y-3.5 mb-8">
                {activeSector.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="bg-teal-100 text-teal-700 p-1 rounded mt-0.5 shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-normal">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white/80 border border-slate-100 rounded-xl mb-6 w-full text-xs text-slate-500 font-medium">
                {activeSector.targetAudience}
              </div>

              <button
                onClick={() => onOpenDemo(`Especialidade: ${activeSector.title}`)}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:translate-x-0.5"
                id={`solutions-cta-${activeTab}`}
              >
                {activeSector.ctaText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column: Dynamic Simulated Feature Preview */}
            <div className="lg:col-span-5 relative mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl" />
                
                {/* Simulated Micro Clinical Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center font-bold text-sm">
                      S
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Configurador de Protocolos</p>
                      <p className="text-[10px] text-slate-400">Atendimento 100% Personalizado</p>
                    </div>
                  </div>
                  <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded">Ativo</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Mapeamento Clínico</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between min-h-[60px]">
                        <span className="text-[9px] text-slate-400 uppercase font-medium">Evolução Mensal</span>
                        <span className="text-sm font-bold text-teal-600">+14% Alta</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex flex-col justify-between min-h-[60px]">
                        <span className="text-[9px] text-slate-400 uppercase font-medium">Glosa Faturamento</span>
                        <span className="text-sm font-bold text-emerald-600">0% Erros</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Frequência Semanal Otimizada</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="font-medium text-slate-700">Fisioterapia Motora</span>
                        <span className="text-teal-600 font-bold">100% Presente</span>
                      </div>
                      <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="font-medium text-slate-700">Fonoaudiologia Integrada</span>
                        <span className="text-teal-600 font-bold">100% Presente</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Conforme LGPD & CFM</span>
                    </div>
                    <span>Versão 8.4.2</span>
                  </div>
                </div>

              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
