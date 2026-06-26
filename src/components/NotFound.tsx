import React, { useState } from 'react';
import { Search, ChevronRight, AlertTriangle, ArrowLeft } from 'lucide-react';
import { MetaTags } from '../seo/MetaTags';

interface NotFoundProps {
  onNavigateHome: () => void;
  onOpenDemo: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome, onOpenDemo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Static content index for the internal search engine
  const searchIndex = [
    { title: 'Simulador de ROI / Eficiência', path: '#calculadora', desc: 'Calcule a economia financeira e de horas na sua clínica.' },
    { title: 'Faturamento SUS (BPA-I, APAC)', path: '#faturamento', desc: 'Gere arquivos de produção SUS automaticamente sem glosas.' },
    { title: 'Prontuário Eletrônico Multiprofissional', path: '#prontuario', desc: 'Registro clínico especializado com metas ABA e gráficos.' },
    { title: 'Agenda Inteligente e Confirmação de Consultas', path: '#agenda', desc: 'Reduza faltas via WhatsApp e preencha vagas ociosas.' },
    { title: 'Casos de Sucesso e Clientes Ativos', path: '#clientes', desc: 'Veja o depoimento de mais de 800 instituições parceiras.' },
    { title: 'Perguntas Frequentes (FAQ)', path: '#faq', desc: 'Tire suas dúvidas sobre integração, convênios e regras da ANS.' }
  ];

  const filteredResults = searchTerm.trim() 
    ? searchIndex.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-blue-950 text-white flex flex-col font-sans">
      {/* Block search indexing on 404 page */}
      <MetaTags 
        title="Página Não Encontrada (404)" 
        description="A página que você está procurando não existe ou foi movida." 
        noIndex={true} 
      />

      {/* Header section */}
      <header className="border-b border-blue-900 bg-blue-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="flex items-center gap-2 group">
            <span className="text-xl font-bold tracking-tight text-white">
              Sis<span className="text-teal-400">HOSP</span> <span className="text-xs font-mono text-slate-500 font-normal">Portal</span>
            </span>
          </a>
          <button 
            onClick={onOpenDemo}
            className="text-xs font-semibold bg-teal-600 hover:bg-teal-500 text-slate-950 px-4 py-2 rounded-lg transition-all"
          >
            Falar com Consultor
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16 sm:py-24 flex flex-col justify-center w-full">
        <section className="text-center mb-12">
          <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 mb-6 border border-red-500/20">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black tracking-tight mb-4">
            Erro 404
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            A página solicitada não foi encontrada ou foi redirecionada permanentemente.
          </p>
        </section>

        {/* Dynamic Internal Search bar */}
        <section className="bg-blue-900 border border-blue-800 p-6 rounded-2xl mb-12 shadow-2xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teal-400 mb-4 font-display">
            O que você está procurando?
          </h2>
          <div className="relative mb-2">
            <input 
              type="text"
              placeholder="Pesquise por faturamento, prontuário, ROI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-blue-950 text-white rounded-xl py-3 pl-11 pr-4 border border-blue-800 focus:outline-none focus:border-teal-500 transition-colors placeholder-blue-900 text-sm"
            />
            <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
          </div>
          
          {searchTerm && filteredResults.length === 0 && (
            <p className="text-xs text-slate-500 mt-2">Nenhum resultado encontrado. Tente buscar termos como "faturamento" ou "ROI".</p>
          )}

          {filteredResults.length > 0 && (
            <div className="mt-4 border-t border-blue-800 pt-4 space-y-3">
              <p className="text-xs text-teal-400 font-semibold mb-2">Páginas correspondentes:</p>
              {filteredResults.map((result) => (
                <a 
                  key={result.path} 
                  href={result.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome();
                    setTimeout(() => {
                      const el = document.querySelector(result.path);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="block p-3 rounded-xl bg-blue-950 hover:bg-blue-900/50 border border-blue-900 hover:border-blue-800 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{result.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{result.desc}</p>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Suggestion Quicklinks */}
        <section className="text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 font-display">
            Links Úteis Recomendados
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <button 
              onClick={onNavigateHome}
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-900/40 border border-blue-800/60 hover:bg-blue-900 transition-all text-left group"
            >
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Voltar ao Início</h4>
                <p className="text-xs text-slate-500 mt-0.5">Página principal do portal</p>
              </div>
            </button>
            <a 
              href="#calculadora"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('calculadora');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="flex items-center gap-3 p-4 rounded-xl bg-blue-900/40 border border-blue-800/60 hover:bg-blue-900 transition-all text-left group"
            >
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Simulador de ROI</h4>
                <p className="text-xs text-slate-500 mt-0.5">Calcular economia</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-blue-900 py-8 bg-blue-950 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SisHOSP. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-slate-400 transition-colors">Voltar para a Home</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
