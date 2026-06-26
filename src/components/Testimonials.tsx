import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, Star, Award, Building2, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  onOpenDemo: (challenge?: string) => void;
}

export default function Testimonials({ onOpenDemo }: TestimonialsProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'apae' | 'autism' | 'rehabilitation'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Maria Auxiliadora',
      role: 'Diretora Administrativa',
      institution: 'APAE de Maceió',
      quote: 'Antes do SisHOSP, o faturamento do SUS era um tormento que levava semanas, repleto de fichas de papel rasuradas e perdas constantes de APACs. Hoje, tudo é validado no ato do atendimento do assistido. Reduzimos as glosas do faturamento SUS a quase zero e eliminamos 98% dos impressos de papel na instituição.',
      metrics: '-98% papel, Glosas Zeradas',
      category: 'apae'
    },
    {
      id: '2',
      name: 'Dr. Thiago Albuquerque',
      role: 'Fundador e Diretor Clínico',
      institution: 'Clínica TEA e Autismo Crescer',
      quote: 'Medir evolução de metas terapêuticas pelo método ABA em planilhas Excel era inviável para nossa escala. O prontuário especializado do SisHOSP mudou nossa história: agora temos gráficos automáticos que mostram a evolução exata de cada criança de acordo com as diretrizes do DSM-5. Pais mais satisfeitos e faturamento ágil.',
      metrics: '+45% engajamento familiar',
      category: 'autism'
    },
    {
      id: '3',
      name: 'Paula Vasconcelos',
      role: 'Coordenadora de Faturamento',
      institution: 'Centro Especializado em Reabilitação III (CER III)',
      quote: 'Controlar as ausências de pacientes em reabilitação motora e de fala era um pescoço de garrafa. Com as confirmações automáticas por WhatsApp do SisHOSP, reduzimos as faltas em 80% e habilitamos o preenchimento imediato pela lista de espera inteligente. Otimizamos 100% da ociosidade dos terapeutas.',
      metrics: '-80% de Absenteísmo',
      category: 'rehabilitation'
    },
    {
      id: '4',
      name: 'Roberto de Oliveira',
      role: 'Gerente Geral',
      institution: 'APAE Alagoas',
      quote: 'A prestação de contas governamentais do convênio exige relatórios impecáveis. A transparência e integridade dos dados gerados pelo SisHOSP nos trouxeram total tranquilidade com o Ministério Público e o Conselho Municipal de Saúde. Recomendo de olhos fechados.',
      metrics: 'Prestação de contas 100% aprovada',
      category: 'apae'
    }
  ];

  const filtered = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const current = filtered[currentIndex] || filtered[0];

  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-100" id="casos-sucesso">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-display font-bold text-xs uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100/50">
            Autoridade & Casos Reais
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mt-4 mb-4">
            A escolha de quem lidera o setor de reabilitação no Brasil
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Mais de 800 instituições filantrópicas, APAEs, clínicas privadas e Centros de Reabilitação do SUS confiam no ecossistema SisHOSP para otimizar suas rotinas diárias.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="testimonial-filter-buttons">
          <button
            onClick={() => { setActiveCategory('all'); setCurrentIndex(0); }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'all' ? 'bg-blue-900 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Todos os Casos
          </button>
          <button
            onClick={() => { setActiveCategory('apae'); setCurrentIndex(0); }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'apae' ? 'bg-blue-900 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            APAEs
          </button>
          <button
            onClick={() => { setActiveCategory('autism'); setCurrentIndex(0); }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'autism' ? 'bg-blue-900 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Clínicas de Autismo
          </button>
          <button
            onClick={() => { setActiveCategory('rehabilitation'); setCurrentIndex(0); }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === 'rehabilitation' ? 'bg-blue-900 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Centros de Reabilitação
          </button>
        </div>

        {/* Testimonials Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
          
          {/* Main Selected Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative">
              <Quote className="w-12 h-12 text-teal-600/10 mb-6 shrink-0" />
              <p className="text-slate-700 text-base sm:text-lg italic leading-relaxed font-medium text-left">
                "{current.quote}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-left">
                <p className="text-base font-display font-bold text-slate-900">{current.name}</p>
                <p className="text-xs text-slate-500 font-medium">{current.role} • <strong className="text-teal-600">{current.institution}</strong></p>
              </div>

              {current.metrics && (
                <div className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-xl border border-emerald-100 text-xs font-bold font-display flex items-center gap-1.5 w-max">
                  <Star className="w-4 h-4 fill-emerald-500 text-emerald-500 shrink-0" />
                  <span>{current.metrics}</span>
                </div>
              )}
            </div>

            {/* Slider Navigation Buttons */}
            {filtered.length > 1 && (
              <div className="flex gap-2 mt-6 justify-end">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
                  aria-label="Depoimento anterior"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
                  aria-label="Depoimento seguinte"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar: Logos / trust stats */}
          <div className="lg:col-span-4 bg-blue-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-teal-400" />
                <span className="text-xs font-bold tracking-wider uppercase font-display text-teal-400">Marcos de Confiança</span>
              </div>

              <h4 className="text-lg font-display font-bold mb-4 leading-snug">
                Tecnologia robusta que impulsiona o SUS no Brasil
              </h4>

              <div className="space-y-4">
                <div className="flex gap-3 items-start text-sm">
                  <div className="bg-slate-800 text-teal-400 p-1 rounded shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Homologado com as regras do Ministério da Saúde.</span>
                </div>
                <div className="flex gap-3 items-start text-sm">
                  <div className="bg-slate-800 text-teal-400 p-1 rounded shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Garantia de segurança da informação em conformidade com a LGPD.</span>
                </div>
                <div className="flex gap-3 items-start text-sm">
                  <div className="bg-slate-800 text-teal-400 p-1 rounded shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Presente nas maiores instituições filantrópicas de Alagoas, Pernambuco, São Paulo e mais.</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={() => onOpenDemo()}
                className="w-full bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                id="testimonials-cta-schedule"
              >
                Conectar Minha Clínica ao Sucesso
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
