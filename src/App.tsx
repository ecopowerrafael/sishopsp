import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Phone, Users, Landmark, FileText, CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import RoiCalculator from './components/RoiCalculator';
import DashboardSimulation from './components/DashboardSimulation';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import DemoModal from './components/DemoModal';

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [initialChallenge, setInitialChallenge] = useState('');

  // Inline lead states
  const [inlineName, setInlineName] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlineSuccess, setInlineSuccess] = useState(false);
  const [inlineLoading, setInlineLoading] = useState(false);

  const handleOpenDemo = (challenge: string = '') => {
    setInitialChallenge(challenge);
    setIsDemoOpen(true);
  };

  const handleInlineSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inlineName || !inlineEmail || !inlinePhone) return;
    
    setInlineLoading(true);
    setTimeout(() => {
      setInlineLoading(false);
      setInlineSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-500 selection:text-white" id="main-app-container">
      
      {/* Dynamic Header / Navigation */}
      <Navbar onOpenDemo={handleOpenDemo} />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero onOpenDemo={handleOpenDemo} />

        {/* Feature Sectors */}
        <Solutions onOpenDemo={handleOpenDemo} />

        {/* Dynamic ROI cost/savings calculator */}
        <RoiCalculator onOpenDemo={handleOpenDemo} />

        {/* Recharts live performance simulator */}
        <DashboardSimulation onOpenDemo={handleOpenDemo} />

        {/* Before vs After comparative matrix */}
        <Comparison onOpenDemo={handleOpenDemo} />

        {/* Direct client stories & proof */}
        <Testimonials onOpenDemo={handleOpenDemo} />

        {/* Real-time Searchable FAQ Accordions */}
        <FaqSection />

        {/* Bottom High-Conversion Lead Capture Form (Inline) */}
        <section className="py-20 bg-teal-950 text-white relative overflow-hidden" id="bottom-conversion-form">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="bg-slate-900 rounded-3xl border border-teal-500/10 overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Side: Brand Authority Pitch */}
                <div className="lg:col-span-6 text-left">
                  <span className="text-[10px] bg-teal-500/20 text-teal-300 font-bold px-3 py-1.5 rounded-full font-display uppercase border border-teal-500/20">
                    Sishosp Portal Oficial
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-4 mb-4">
                    Pronto para modernizar sua instituição de reabilitação?
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                    Não deixe que a ineficiência administrativa drene os recursos que deveriam ser aplicados na saúde e bem-estar dos seus assistidos. Fale agora com nossa equipe de especialistas e migre seus dados com segurança.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-teal-500/10 text-teal-400 rounded-lg flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-slate-200">Suporte técnico de implantação 5 estrelas.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-teal-500/10 text-teal-400 rounded-lg flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <span className="text-sm text-slate-200">Plataforma em total conformidade com a LGPD e ANS.</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Quick Lead Form */}
                <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 text-slate-900 shadow-xl relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  {!inlineSuccess ? (
                    <form onSubmit={handleInlineSubmit} className="space-y-4 text-left">
                      <h4 className="text-lg font-display font-bold text-slate-900 mb-1">
                        Fale com um Especialista
                      </h4>
                      <p className="text-xs text-slate-500 mb-4">
                        Preencha o formulário rápido para receber uma ligação em até 2 horas.
                      </p>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Seu Nome</label>
                        <input
                          type="text"
                          required
                          value={inlineName}
                          onChange={(e) => setInlineName(e.target.value)}
                          placeholder="Dr. Roberto Silva"
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">E-mail Corporativo</label>
                        <input
                          type="email"
                          required
                          value={inlineEmail}
                          onChange={(e) => setInlineEmail(e.target.value)}
                          placeholder="roberto@clinicax.com.br"
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">WhatsApp / Celular</label>
                        <input
                          type="tel"
                          required
                          value={inlinePhone}
                          onChange={(e) => setInlinePhone(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={inlineLoading || !inlineName || !inlineEmail || !inlinePhone}
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-lg mt-2 transition-all flex items-center justify-center gap-2 shadow-md"
                        id="bottom-inline-submit-button"
                      >
                        {inlineLoading ? 'Processando...' : 'Agendar Minha Apresentação'}
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <p className="text-[10px] text-slate-400 text-center mt-3">
                        Garantimos a segurança dos seus dados de acordo com a LGPD.
                      </p>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-display font-bold text-slate-900 mb-1">
                        Dados Enviados com Sucesso!
                      </h4>
                      <p className="text-xs text-slate-600 max-w-xs mx-auto mb-6">
                        Obrigado <strong className="text-slate-900">{inlineName}</strong>, nossa central de agendamento entrará em contato em breve pelo telefone <strong className="text-slate-900">{inlinePhone}</strong>.
                      </p>
                      <button
                        onClick={() => {
                          setInlineSuccess(false);
                          setInlineName('');
                          setInlineEmail('');
                          setInlinePhone('');
                        }}
                        className="text-xs font-semibold text-teal-600 underline"
                      >
                        Enviar outro contato
                      </button>
                    </motion.div>
                  )}

                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Structured Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-left" id="portal-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Logo area */}
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2 group mb-4">
                <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center text-white font-display font-bold text-base">
                  S
                </div>
                <span className="font-display font-bold text-lg text-white">sishosp <span className="text-teal-400 text-xs font-semibold uppercase">Portal</span></span>
              </a>
              <p className="text-xs text-slate-500 leading-relaxed">
                Plataforma oficial para gestão especializada de clínicas, APAEs, autismo ABA e faturamento SUS/TISS em nuvem de alta segurança.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-4">Páginas de Interesse</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#solucoes" className="hover:text-white transition-colors">Segmentos Recomendados</a></li>
                <li><a href="#calculadora" className="hover:text-white transition-colors">Calculadora de Economia</a></li>
                <li><a href="#dashboard-demo" className="hover:text-white transition-colors">Dashboard ao Vivo</a></li>
                <li><a href="#casos-sucesso" className="hover:text-white transition-colors">Casos de Sucesso Reais</a></li>
              </ul>
            </div>

            {/* Support and Technical resources */}
            <div>
              <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-4">Suporte & Contato</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>0800 591 2341 (Vendas)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>comercial@sishosp.com.br</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                  <span>Suporte Técnico Integrado</span>
                </li>
              </ul>
            </div>

            {/* Compliance badges */}
            <div>
              <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-4">Conformidade Legal</h4>
              <div className="space-y-2">
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-[10px] text-slate-400 leading-normal">
                  <p className="font-semibold text-slate-300">100% Conforme LGPD</p>
                  <p>Banco de dados protegido na AWS com criptografia de ponta a ponta.</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg text-[10px] text-slate-400 leading-normal">
                  <p className="font-semibold text-slate-300">Resoluções CFM e ANS</p>
                  <p>Prontuário multiprofissional com assinatura eletrônica legalizada.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Sishosp Portal. Todos os direitos reservados. Reconstruído no domínio portal.sishosp.com.br.</p>
            <div className="flex gap-4">
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade de Acordo com a LGPD regulamentadas pelo Sishosp.'); }} className="hover:text-slate-400 transition-colors">Termos de Uso</a>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade de Acordo com a LGPD regulamentadas pelo Sishosp.'); }} className="hover:text-slate-400 transition-colors">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Demonstration Request Modal */}
      <DemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        initialChallenge={initialChallenge}
      />

    </div>
  );
}
