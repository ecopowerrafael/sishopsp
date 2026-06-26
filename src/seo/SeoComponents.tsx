import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  ChevronDown, 
  Briefcase, 
  BadgeAlert,
  ChevronRight,
  TrendingUp,
  Award,
  Share2,
  Calendar,
  Lock,
  Search,
  MessageSquare,
  Users
} from 'lucide-react';
import { SeoPageData, getSegmentSpecificFaqs, SEO_PAGES_LIST } from './seoPagesData';
import { useSeo } from './MetaTags';

/**
 * 1. HERO SEO Component
 */
interface HeroSeoProps {
  data: SeoPageData;
  onOpenDemo: () => void;
}

export const HeroSEO: React.FC<HeroSeoProps> = ({ data, onOpenDemo }) => {
  return (
    <section className="relative overflow-hidden bg-blue-950 text-white pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,38,38,0.1),transparent_50%)]" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plataforma Líder de Gestão em Saúde</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1] text-white">
              {data.heroTitle}
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              {data.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-sm transition-all duration-150 shadow-lg shadow-teal-900/20 group cursor-pointer"
              >
                <span>Solicitar Demonstração Grátis</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-850 border border-blue-800 hover:border-blue-700 text-white font-semibold text-sm transition-all duration-150 cursor-pointer"
              >
                <span>Falar com Especialista</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-900 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-black text-white">+800</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider">Clientes Ativos</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">99.7%</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider">Uptime Garantido</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">Zero</p>
                <p className="text-[11px] text-slate-500 uppercase tracking-wider">Erros de BPA-I</p>
              </div>
            </div>

          </div>

          {/* Graphical Mockup / Decorative Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 to-red-500 opacity-20 blur-xl" />
            <div className="relative rounded-2xl bg-blue-900/80 border border-blue-800 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-blue-800/80 mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="w-3 h-3 rounded-full bg-teal-500" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 tracking-widest">SISHOSP PORTAL SECURE_API</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-950 border border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Eficiência Operacional</p>
                      <p className="text-sm font-bold text-white">Mapeamento Automatizado</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-teal-400 font-bold bg-teal-400/10 px-2 py-0.5 rounded">+45%</span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-950 border border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Padrões de Criptografia</p>
                      <p className="text-sm font-bold text-white">Compliance Geral LGPD</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-red-400 font-bold bg-red-400/10 px-2 py-0.5 rounded">Ativo</span>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/50 text-left space-y-1">
                  <p className="text-xs text-slate-500">Prontuário Multidisciplinar:</p>
                  <p className="text-xs text-slate-300 italic">"Histórico clínico integrado que atende 100% aos requisitos de auditorias de planos de saúde e portarias do SUS."</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/**
 * 2. BENEFITS SECTION Component
 */
interface BenefitsSectionProps {
  data: SeoPageData;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ data }) => {
  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-950">
            Diferenciais projetados para maximizar o retorno no seu segmento
          </h2>
          <p className="text-slate-600 mt-4">
            Como o SisHOSP ajuda você a combater custos desnecessários, burocracia e inconsistências operacionais de forma inteligente.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="flex flex-col p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all text-left group"
            >
              {benefit.metric && (
                <div className="text-3xl font-black text-teal-600 font-display mb-4 tracking-tight group-hover:scale-105 transition-transform duration-200">
                  {benefit.metric}
                </div>
              )}
              <h3 className="font-bold text-lg text-slate-950 mb-2">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                {benefit.desc}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 uppercase tracking-wider mt-6">
                <span>Benefício Ativo</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

/**
 * 3. CALCULATOR SECTION Component
 */
interface CalculatorSectionProps {
  data: SeoPageData;
  onOpenDemo: () => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ data, onOpenDemo }) => {
  // States for dynamic calculation inputs
  const [val1, setVal1] = useState<number>(30); // Number of beds or transactions
  const [val2, setVal2] = useState<number>(1500); // Cost or price per transaction
  const [tax, setTax] = useState<number>(8); // Inefficiency or loss rate (%)

  // Compute estimates dynamically based on type
  const calculateSavings = () => {
    if (data.calculatorType === 'leitos') {
      // Inputs: Beds (val1), Average Daily Rate (val2), Ocupation increase (tax)
      // Gain = Beds * Rate * 365 * (tax / 100)
      const annualGain = Math.round(val1 * val2 * 365 * (tax / 100));
      return {
        label: 'Aumento Anual de Faturamento Est.",',
        value: `R$ ${annualGain.toLocaleString('pt-BR')}`,
        desc: 'Recuperação de ociosidade de higienização e alta'
      };
    } else if (data.calculatorType === 'glosas') {
      // Inputs: Monthly Revenue (val1 * 10000), Current Glosa rate (tax)
      // SisHOSP can prevent 85% of these glosas
      const revenue = val1 * 10000;
      const annualLoss = revenue * 12 * (tax / 100);
      const savedAmount = Math.round(annualLoss * 0.85);
      return {
        label: 'Prevenção de Glosas com SisHOSP',
        value: `R$ ${savedAmount.toLocaleString('pt-BR')} / ano`,
        desc: 'Economia ao eliminar erros de digitação e regras TISS/SUS inválidas'
      };
    } else if (data.calculatorType === 'faturamento') {
      // Inputs: Monthly transactions (val1 * 10), average price (val2)
      // Acceleration of 15% in revenue release
      const monthlyRevenue = val1 * 10 * val2;
      const acceleratedValue = Math.round(monthlyRevenue * 0.15);
      return {
        label: 'Fluxo de Caixa Acelerado',
        value: `R$ ${acceleratedValue.toLocaleString('pt-BR')} / mês`,
        desc: 'Liberação rápida de caixa com faturamento automatizado'
      };
    } else {
      // tempo_atendimento
      // Inputs: Patients/Day (val1), Hours spent on paperwork (tax)
      // SisHOSP reduces paperwork by 60%
      const monthlyHours = Math.round(val1 * tax * 22);
      const savedHours = Math.round(monthlyHours * 0.6);
      return {
        label: 'Tempo de TI/Administrativo Recuperado',
        value: `${savedHours} Horas / mês`,
        desc: 'Geração automática de gráficos, receitas e relatórios'
      };
    }
  };

  const results = calculateSavings();

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100" id="calculadora">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Inputs */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 uppercase tracking-widest">
              <Calculator className="w-4 h-4" />
              <span>Simulação de ROI Interativa</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-950">
              {data.calculatorLabel}
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {data.calculatorHelpText}
            </p>

            <div className="space-y-5 pt-4">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>
                    {data.calculatorType === 'leitos' ? 'Quantidade de Leitos:' : 
                     data.calculatorType === 'glosas' ? 'Faturamento Mensal (x R$10k):' : 
                     data.calculatorType === 'faturamento' ? 'Consultas/Exames por Mês (x 10):' : 
                     'Pacientes Atendidos por Dia:'}
                  </span>
                  <span className="text-teal-600">{val1}</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="500" 
                  value={val1} 
                  onChange={(e) => setVal1(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>

              {/* Slider 2 */}
              {data.calculatorType !== 'tempo_atendimento' && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>
                      {data.calculatorType === 'leitos' ? 'Valor Médio da Diária (R$):' : 
                       data.calculatorType === 'faturamento' ? 'Preço Médio Procedimento (R$):' : 
                       'Custo Operacional de Apoio:'}
                    </span>
                    <span className="text-teal-600">R$ {val2.toLocaleString('pt-BR')}</span>
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="5000" 
                    step="50"
                    value={val2} 
                    onChange={(e) => setVal2(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                </div>
              )}

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span>
                    {data.calculatorType === 'leitos' ? 'Meta de Ganho de Ocupação (%):' : 
                     data.calculatorType === 'glosas' ? 'Taxa Atual de Glosa Financeira (%):' : 
                     data.calculatorType === 'faturamento' ? 'Aceleração de Glosa Preventiva (%):' : 
                     'Horas Manuais de Papelada por Paciente:'}
                  </span>
                  <span className="text-teal-600">{tax}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={tax} 
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>
            </div>

          </div>

          {/* Dynamic Result Card */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-500 to-red-600 opacity-20 blur-xl" />
            <div className="relative rounded-2xl bg-blue-900 border border-blue-800 p-8 text-center text-white space-y-6">
              
              <div className="inline-flex p-3 rounded-full bg-teal-500/10 text-teal-400">
                <TrendingUp className="w-8 h-8" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                  Retorno Estimado com SisHOSP
                </p>
                <p className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white mb-2">
                  {results.value}
                </p>
                <p className="text-sm text-teal-400 font-semibold mb-4">
                  {results.desc}
                </p>
                <button
                  onClick={onOpenDemo}
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-sm transition-all duration-150 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Garantir essa Economia</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-800 text-slate-400 text-xs text-left leading-relaxed">
                * Os cálculos utilizam coeficientes médios validados em auditorias operacionais reais de mais de 800 hospitais e clínicas brasileiras usuárias do SisHOSP. Os valores finais podem variar conforme a complexidade regulatória do seu estado.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

/**
 * 4. COMPARISON TABLE Component
 */
export const ComparisonTable: React.FC = () => {
  const comparisonItems = [
    { feature: 'Faturamento SUS BPA-I / APAC', manual: 'Digitação manual, alto índice de rejeição de lotes', sishosp: 'Geração 100% automatizada e sem digitação dupla' },
    { feature: 'Confirmação de Agenda', manual: 'Ligações manuais, alto índice de faltas e horários vagos', sishosp: 'Robô de confirmação WhatsApp integrado com fila de espera' },
    { feature: 'Evoluções Clínicas e Anamnese', manual: 'Fichas de papel, prontuários ilegíveis e arquivamento lento', sishosp: 'Timeline digital ágil com validação em tempo real e assinatura' },
    { feature: 'Faturamento TISS (XML)', manual: 'Erros de digitação, glosas elevadas e reprocessamentos demorados', sishosp: 'Validação eletrônica instantânea conforme regras da ANS' },
    { feature: 'Gestão de Estoque e Dispensação', manual: 'Falta de controle de lotes, desperdícios e perdas de validade', sishosp: 'Baixa de estoque automatizada a partir da prescrição do paciente' },
    { feature: 'Suporte Técnico e Implantação', manual: 'Suporte demorado, sem treinamento para faturamento do SUS', sishosp: 'Treinamento completo com especialistas em regras do SUS e TISS' }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-950">
            Compare: Processo Tradicional vs SisHOSP
          </h2>
          <p className="text-slate-600 mt-4">
            Entenda como a automação de processos reverte gargalos em receita líquida estável.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-xl">
          <table className="w-full border-collapse text-left text-sm text-slate-500">
            <thead className="bg-blue-950 text-white">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Recurso / Operacional</th>
                <th scope="col" className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-red-400">Processo Tradicional (Manual / Planilhas)</th>
                <th scope="col" className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-teal-400 bg-blue-900">Plataforma SisHOSP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.feature}</td>
                  <td className="px-6 py-4 text-slate-600">{item.manual}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium bg-teal-500/5">{item.sishosp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};

/**
 * 5. FAQ SECTION Component (Dynamic 10-20 specific questions)
 */
interface FaqSectionProps {
  data: SeoPageData;
}

export const FAQSection: React.FC<FaqSectionProps> = ({ data }) => {
  const faqs = getSegmentSpecificFaqs(data.category, data.keyword);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex p-3 rounded-full bg-teal-500/10 text-teal-600 mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-950">
            Perguntas Frequentes sobre {data.keyword}
          </h2>
          <p className="text-slate-600 mt-4">
            Respostas completas para as principais dúvidas de gestores de saúde sobre a implantação, recursos técnicos e faturamento.
          </p>
        </div>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-teal-600' : ''}`} 
                  />
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/**
 * 6. RELATED PAGES Component (Links 5 pages of same category dynamically)
 */
interface RelatedPagesProps {
  data: SeoPageData;
}

export const RelatedPages: React.FC<RelatedPagesProps> = ({ data }) => {
  const { setCurrentPath } = useSeo();
  
  // Find up to 5 related pages from the catalog belonging to the same category/topic
  const related = SEO_PAGES_LIST
    .filter(page => page.slug !== data.slug && page.category === data.category)
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-100 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6 font-display">
          Conteúdo Altamente Relacionado
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {related.map((page) => (
            <a
              key={page.slug}
              href={`/${page.slug}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPath(`/${page.slug}`);
              }}
              className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 transition-all block group"
            >
              <div className="text-teal-600 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-1">
                <span>{page.keyword}</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-slate-900 font-bold text-xs leading-tight mb-2 group-hover:text-teal-600 transition-colors">
                {page.title.split(' - ')[0]}
              </p>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {page.metaDescription}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 7. CALL TO ACTION Component
 */
interface CallToActionProps {
  onOpenDemo: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenDemo }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-950 to-blue-900 text-white relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.15),transparent_60%)]" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
        <div className="inline-flex p-3 rounded-full bg-teal-500/10 text-teal-400 mb-2">
          <Award className="w-10 h-10 animate-pulse" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight">
          Pronto para zerar glosas e maximizar a eficiência da sua equipe?
        </h2>
        
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Centenas de gestores já utilizam o SisHOSP para eliminar erros administrativos, unificar prontuários e controlar o fluxo financeiro de ponta a ponta.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 pt-4 max-w-md mx-auto">
          <button
            onClick={onOpenDemo}
            className="px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-sm sm:text-base transition-all duration-150 shadow-xl shadow-teal-950/40 cursor-pointer"
          >
            Falar com Consultor Especializado
          </button>
          
          <button
            onClick={onOpenDemo}
            className="px-8 py-4 rounded-xl bg-blue-900 hover:bg-blue-850 border border-blue-800 hover:border-blue-700 text-white font-semibold text-sm sm:text-base transition-all duration-150 cursor-pointer"
          >
            Ver Planos & Valores
          </button>
        </div>
      </div>
    </section>
  );
};
