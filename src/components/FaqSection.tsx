import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Search, ChevronDown, ChevronUp, Sparkles, MessageSquare } from 'lucide-react';
import { FAQItem } from '../types';

export default function FaqSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'faturamento' | 'prontuario' | 'agenda' | 'geral'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'O Sishosp exporta arquivos para o faturamento SUS?',
      answer: 'Sim! O Sishosp possui um dos módulos de faturamento SUS mais robustos do mercado. Ele gera de forma 100% automatizada e validada os arquivos magnéticos de BPA-I (Boletim de Produção Ambulatorial Individualizado) e de APAC (Autorização de Procedimentos de Alta Complexidade), eliminando erros e digitação dupla.',
      category: 'faturamento'
    },
    {
      id: 'faq-2',
      question: 'Como funciona o prontuário especializado em Autismo e método ABA?',
      answer: 'O prontuário do Sishosp permite registrar objetivos terapêuticos detalhados, metas de reforço, comportamentos-barreira e evolução clínica. O sistema gera automaticamente os gráficos de curva de aprendizagem e evolução exigidos por planos de saúde e auditorias de forma científica, sem que o terapeuta gaste horas em planilhas.',
      category: 'prontuario'
    },
    {
      id: 'faq-3',
      question: 'Vocês fazem a migração de dados do meu sistema antigo?',
      answer: 'Sim. Contamos com um time técnico dedicado que faz a extração, higienização e carga de dados do seu software anterior (sejam tabelas antigas, planilhas ou banco de dados relacional). Seus prontuários, dados cadastrais de assistidos e históricos médicos são preservados.',
      category: 'geral'
    },
    {
      id: 'faq-4',
      question: 'Como funciona o treinamento para a equipe de terapeutas e faturistas?',
      answer: 'Nossa implantação é assistida e humanizada. Oferecemos treinamentos ao vivo para o setor administrativo, financeiro e faturamento. Para os terapeutas e médicos, fornecemos um treinamento prático e focado no preenchimento rápido de evoluções, além de uma central de ajuda completa e suporte via WhatsApp.',
      category: 'geral'
    },
    {
      id: 'faq-5',
      question: 'O Sishosp suporta faturamento de convênios particulares (TISS)?',
      answer: 'Com certeza. O sistema está totalmente atualizado com os padrões de Guia de Consulta, SADT e Lote do padrão TISS da ANS. Ele gera os arquivos XML de cobrança validados e organiza o controle de glosas para que você identifique onde estão os gargalos financeiros com as operadoras.',
      category: 'faturamento'
    },
    {
      id: 'faq-6',
      question: 'Como a assinatura digital do paciente evita auditorias fiscais ruins?',
      answer: 'A assinatura digital coletada no tablet/celular dos terapeutas substitui com plena validade legal as folhas de presença físicas. O sistema grava o IP, coordenadas de GPS e dados do responsável, gerando relatórios invioláveis de frequência que dão segurança total à sua instituição em vistorias do SUS e operadoras.',
      category: 'agenda'
    }
  ];

  const filteredItems = faqItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal-600 font-display font-bold text-xs uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100/50">
            Perguntas Frequentes
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight mt-4 mb-4">
            Esclareça suas dúvidas técnicas
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Selecione uma categoria ou pesquise pelo assunto que deseja entender sobre a operacionalidade do Sishosp Portal.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquise por faturamento, prontuário, migração, ABA..."
            className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-slate-50/50"
            id="faq-search-input"
          />
        </div>

        {/* Category Toggles */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" id="faq-category-filters">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'all' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveCategory('faturamento')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'faturamento' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Faturamento SUS/TISS
          </button>
          <button
            onClick={() => setActiveCategory('prontuario')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'prontuario' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Prontuários ABA/Clínico
          </button>
          <button
            onClick={() => setActiveCategory('agenda')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeCategory === 'agenda' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            Agendas & Presença
          </button>
        </div>

        {/* Accordions List */}
        <div className="space-y-4 max-w-3xl mx-auto text-left" id="faq-accordions-list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="border border-slate-200/65 rounded-xl bg-slate-50/20 overflow-hidden transition-all duration-200 hover:border-slate-300/80"
              >
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full px-5 py-4 flex justify-between items-center text-left font-bold font-display text-slate-900 text-sm sm:text-base focus:outline-none"
                  aria-expanded={expandedId === item.id}
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-teal-600 shrink-0" />
                    {item.question}
                  </span>
                  {expandedId === item.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {expandedId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-100">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-500">Nenhuma pergunta encontrada para sua busca.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="text-teal-600 text-xs font-bold underline mt-1"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
