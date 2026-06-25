import { Check, X, AlertTriangle, HelpCircle, Sparkles, LayoutList, ArrowRight } from 'lucide-react';

interface ComparisonProps {
  onOpenDemo: (challenge?: string) => void;
}

export default function Comparison({ onOpenDemo }: ComparisonProps) {
  const comparisonItems = [
    {
      topic: 'Lançamento & Faturamento SUS',
      without: 'Digitação tardia das APACs e BPA-I em planilhas ou sistemas defasados, gerando erros manuais constantes e perda de prazos.',
      with: 'Validação no ato do atendimento. Geração instantânea de arquivos SUS auditáveis sem erros de digitação de CNS.',
      isCritical: true,
    },
    {
      topic: 'Evoluções Clínicas & Prontuário',
      without: 'Fichas em papel desorganizadas ou editores de texto genéricos sem acompanhamento de metas estruturadas (padrão ABA).',
      with: 'Prontuário único multiprofissional. Acompanhamento visual de evolução de metas clínicas por paciente em segundos.',
      isCritical: false,
    },
    {
      topic: 'Gestão de Faltas (No-Shows)',
      without: 'Gasto de tempo ligando um a um para confirmar presença. Agendas ociosas quando o paciente falta de última hora.',
      with: 'Lembretes de confirmação automáticos via WhatsApp. Fila de espera acionada automaticamente para repor vagas livres.',
      isCritical: true,
    },
    {
      topic: 'Agendas Multiprofissionais',
      without: 'Choque de horários de terapeutas e salas de atendimento. Dificuldade de gerenciar sessões integradas ou em grupos.',
      with: 'Painel unificado e inteligente que gerencia múltiplos profissionais, salas e especialidades sem conflitos de agenda.',
      isCritical: false,
    },
    {
      topic: 'Presença do Paciente',
      without: 'Assinaturas em papel fáceis de perder, gerando problemas gravíssimos em auditorias e fiscalizações do SUS ou planos.',
      with: 'Assinatura digital na tela do tablet ou controle biométrico. Registro inviolável com geolocalização e data.',
      isCritical: true,
    },
  ];

  return (
    <section className="py-20 bg-white" id="comparativo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-display font-bold text-xs uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100/50">
            Comparativo de Eficiência
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mt-4 mb-4">
            Como sua clínica opera hoje vs. Como ela deve operar amanhã
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Compare o gargalo de processos manuais com o ganho de produtividade de uma rotina 100% otimizada pelo SisHOSP Portal.
          </p>
        </div>

        {/* Comparison Table Grid */}
        <div className="max-w-5xl mx-auto border border-slate-200/60 rounded-3xl overflow-hidden shadow-lg" id="comparison-table-wrapper">
          {/* Table Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-900 text-white font-display font-bold text-sm text-center">
            <div className="md:col-span-4 p-4 md:border-r border-slate-800 flex items-center justify-center md:justify-start pl-6 text-slate-300">
              Processo / Área
            </div>
            <div className="md:col-span-4 p-4 bg-red-950/20 md:border-r border-slate-800 text-red-300 flex items-center justify-center gap-2">
              <X className="w-4 h-4" />
              Sem SisHOSP (Planilhas / Papel)
            </div>
            <div className="md:col-span-4 p-4 bg-teal-950/20 text-teal-300 flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Com SisHOSP (Gestão Automatizada)
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-slate-100 bg-white" id="comparison-rows-list">
            {comparisonItems.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 text-sm items-stretch hover:bg-slate-50/40 transition-colors">
                
                {/* Topic Column */}
                <div className="md:col-span-4 p-5 md:p-6 md:border-r border-slate-100 flex flex-col justify-center text-left">
                  <span className="font-display font-bold text-slate-900">{item.topic}</span>
                  {item.isCritical && (
                    <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-700 font-bold px-1.5 py-0.5 rounded mt-1.5 w-max">
                      <AlertTriangle className="w-3 h-3 text-red-500" />
                      Risco de Glosa Alto
                    </span>
                  )}
                </div>

                {/* Without SisHOSP Column */}
                <div className="md:col-span-4 p-5 md:p-6 bg-red-50/10 md:border-r border-slate-100 text-slate-500 text-left leading-relaxed flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p>{item.without}</p>
                </div>

                {/* With SisHOSP Column */}
                <div className="md:col-span-4 p-5 md:p-6 bg-teal-50/10 text-slate-700 text-left font-medium leading-relaxed flex items-start gap-3">
                  <Check className="w-5 h-5 text-teal-600 shrink-0 mt-0.5 animate-pulse" />
                  <p>{item.with}</p>
                </div>

              </div>
            ))}
          </div>

          {/* Table Footer CTA */}
          <div className="bg-slate-50 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <span className="text-xs text-slate-500 text-left font-medium">
              *Pesquisa com clientes ativos demonstrou aumento de faturamento médio de <strong className="text-teal-600">18% no primeiro trimestre</strong> após implantação do SisHOSP.
            </span>
            <button
              onClick={() => onOpenDemo()}
              className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0"
              id="comparison-cta-schedule"
            >
              Mudar de Patamar Administrativo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
