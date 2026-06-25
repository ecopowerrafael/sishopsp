import { useEffect, useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Mail, Phone, Users, Landmark, FileText, CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ActiveClients from './components/ActiveClients';
import Solutions from './components/Solutions';
import RoiCalculator from './components/RoiCalculator';
import DashboardSimulation from './components/DashboardSimulation';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import DemoModal from './components/DemoModal';

// SEO imports
import { SeoProvider, useSeo, MetaTags } from './seo/MetaTags';
import { Breadcrumb, BreadcrumbCrumb } from './seo/Breadcrumb';
import { NotFound } from './components/NotFound';
import { seoConfig } from './seo/seo.config';

// Dynamic SEO database and reusable layout components
import { SEO_PAGES_LIST, getSegmentSpecificFaqs } from './seo/seoPagesData';
import { 
  HeroSEO, 
  BenefitsSection, 
  CalculatorSection, 
  ComparisonTable, 
  FAQSection, 
  RelatedPages, 
  CallToAction 
} from './seo/SeoComponents';

function AppContent() {
  const { currentPath, setCurrentPath } = useSeo();
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [initialChallenge, setInitialChallenge] = useState('');

  // Inline lead states
  const [inlineName, setInlineName] = useState('');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePhone, setInlinePhone] = useState('');
  const [inlineSuccess, setInlineSuccess] = useState(false);
  const [inlineLoading, setInlineLoading] = useState(false);

  const handleOpenDemo = (challenge: any = '') => {
    const cleanChallenge = typeof challenge === 'string' ? challenge : '';
    setInitialChallenge(cleanChallenge);
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

  // Determine if the route matches any of the 30 commercial SEO pages
  const seoPageMatched = SEO_PAGES_LIST.find(p => `/${p.slug}` === currentPath);
  
  // Determine valid paths
  const validPaths = ['/', '/funcionalidades', '/faturamento-sus', '/calculadora'];
  const isValidPath = validPaths.includes(currentPath) || !!seoPageMatched;

  // Smooth scroll and handle path change state mapping
  useEffect(() => {
    if (seoPageMatched) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentPath === '/funcionalidades') {
      const el = document.getElementById('solucoes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (currentPath === '/faturamento-sus') {
      const el = document.getElementById('dashboard-demo');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (currentPath === '/calculadora') {
      const el = document.getElementById('calculadora');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (currentPath === '/') {
      // Avoid scrolling on initial loads
      if (window.scrollY > 100) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentPath]);

  // If path is invalid, render the 404 page
  if (!isValidPath) {
    return (
      <NotFound 
        onNavigateHome={() => setCurrentPath('/')} 
        onOpenDemo={() => handleOpenDemo()} 
      />
    );
  }

  // Define breadcrumbs based on the current path
  const crumbs: BreadcrumbCrumb[] = [];
  if (seoPageMatched) {
    crumbs.push({ name: 'Soluções Especializadas', path: '/' });
    crumbs.push({ name: seoPageMatched.keyword, path: `/${seoPageMatched.slug}` });
  } else if (currentPath === '/funcionalidades') {
    crumbs.push({ name: 'Funcionalidades', path: '/funcionalidades' });
  } else if (currentPath === '/faturamento-sus') {
    crumbs.push({ name: 'Faturamento SUS', path: '/faturamento-sus' });
  } else if (currentPath === '/calculadora') {
    crumbs.push({ name: 'Calculadora de ROI', path: '/calculadora' });
  }

  // Setup metadata details for each sub-path
  let seoTitle = undefined;
  let seoDescription = undefined;
  let schemaType: 'landing' | 'product' | 'faq' | 'article' | 'website' = 'landing';

  const defaultFaqs = [
    {
      question: 'O SisHOSP exporta arquivos para o faturamento SUS?',
      answer: 'Sim! O SisHOSP possui um dos módulos de faturamento SUS mais robustos do mercado. Ele gera de forma 100% automatizada e validada os arquivos magnéticos de BPA-I (Boletim de Produção Ambulatorial Individualizado) e de APAC (Autorização de Procedimentos de Alta Complexidade), eliminando erros e digitação dupla.'
    },
    {
      question: 'Como funciona o prontuário especializado em Autismo e método ABA?',
      answer: 'O prontuário do SisHOSP permite registrar objetivos terapêuticos detalhados, metas de reforço, comportamentos-barreira e evolução clínica. O sistema gera automaticamente os gráficos de curva de aprendizagem e evolução exigidos por planos de saúde e auditorias de forma científica, sem que o terapeuta gaste horas in planilhas.'
    }
  ];

  let dynamicFaqs = defaultFaqs;

  if (seoPageMatched) {
    seoTitle = seoPageMatched.title;
    seoDescription = seoPageMatched.metaDescription;
    schemaType = 'product';
    dynamicFaqs = getSegmentSpecificFaqs(seoPageMatched.category, seoPageMatched.keyword);
  } else if (currentPath === '/funcionalidades') {
    seoTitle = 'Funcionalidades Completas de Gestão Clínica';
    seoDescription = 'Explore o prontuário especializado método ABA, agenda com confirmações automáticas por WhatsApp e indicadores gerenciais do SisHOSP.';
    schemaType = 'product';
  } else if (currentPath === '/faturamento-sus') {
    seoTitle = 'Faturamento SUS BPA-I e APAC Descomplicados';
    seoDescription = 'Emita guias BPA-I e APAC automaticamente de acordo com as portarias federais sem erros de digitação e com glosas zeradas.';
    schemaType = 'product';
  } else if (currentPath === '/calculadora') {
    seoTitle = 'Simulador de Eficiência e Cálculo de ROI';
    seoDescription = 'Simule e calcule em tempo real o retorno financeiro e a economia de tempo administrativo com a plataforma SisHOSP.';
    schemaType = 'product';
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-500 selection:text-white" id="main-app-container">
      {/* Meta tags and automated Schema markup injection */}
      <MetaTags 
        title={seoTitle}
        description={seoDescription}
        schemaType={schemaType === 'landing' ? 'faq' : schemaType}
        faqItems={dynamicFaqs}
      />

      {/* Header element to satisfy semantic HTML requirement */}
      <header className="relative z-50">
        {/* Dynamic Header / Navigation */}
        <Navbar onOpenDemo={handleOpenDemo} />
      </header>

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Render visual breadcrumbs if on a sub-route */}
        {crumbs.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 -mb-16 relative z-10">
            <Breadcrumb crumbs={crumbs} />
          </div>
        )}
        
        {seoPageMatched ? (
          <>
            {/* Dynamic Segment-Specific SEO Landing Page */}
            <HeroSEO data={seoPageMatched} onOpenDemo={handleOpenDemo} />
            <BenefitsSection data={seoPageMatched} />
            <CalculatorSection data={seoPageMatched} onOpenDemo={handleOpenDemo} />
            <ComparisonTable />
            <RelatedPages data={seoPageMatched} />
            <FAQSection data={seoPageMatched} />
            <CallToAction onOpenDemo={handleOpenDemo} />
          </>
        ) : (
          <>
            {/* Hero Section */}
            <Hero onOpenDemo={handleOpenDemo} />

            {/* Active Client Logos Section */}
            <ActiveClients />

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
                        SisHOSP Portal Oficial
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
          </>
        )}

      </main>

      {/* Structured Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900 text-left" id="portal-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Logo area */}
            <div className="md:col-span-1">
              <a href="#" className="flex items-center group mb-4">
                <img
                  src="https://sishosp.com.br/wp-content/uploads/2025/03/cropped-logo-sishosp.webp"
                  alt="SisHOSP"
                  className="h-18 w-auto object-contain transition-transform group-hover:scale-105"
                  style={{ filter: "drop-shadow(2px 0 0 #ffffff) drop-shadow(-2px 0 0 #ffffff) drop-shadow(0 2px 0 #ffffff) drop-shadow(0 -2px 0 #ffffff)" }}
                  referrerPolicy="no-referrer"
                />
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

          {/* SEO Commercial Landing Pages Directory */}
          <div className="pt-8 mt-8 border-t border-slate-900">
            <h4 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-6">
              Diretório de Soluções Geriátricas, Clínicas e Hospitalares (SEO Hub)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[11px] text-slate-400">
              
              <div>
                <h5 className="text-slate-300 font-bold mb-3 uppercase tracking-wider">Hospitais & Redes</h5>
                <ul className="space-y-2">
                  {SEO_PAGES_LIST.filter(p => p.category === 'hospital').map(page => (
                    <li key={page.slug}>
                      <a 
                        href={`/${page.slug}`} 
                        onClick={(e) => { e.preventDefault(); setCurrentPath(`/${page.slug}`); }}
                        className="hover:text-teal-400 hover:underline transition-colors"
                      >
                        {page.keyword}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-slate-300 font-bold mb-3 uppercase tracking-wider">Clínicas & Centros Médicos</h5>
                <ul className="space-y-2">
                  {SEO_PAGES_LIST.filter(p => p.category === 'clinica').map(page => (
                    <li key={page.slug}>
                      <a 
                        href={`/${page.slug}`} 
                        onClick={(e) => { e.preventDefault(); setCurrentPath(`/${page.slug}`); }}
                        className="hover:text-teal-400 hover:underline transition-colors"
                      >
                        {page.keyword}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-slate-300 font-bold mb-3 uppercase tracking-wider">Geriátricos & ILPI</h5>
                <ul className="space-y-2">
                  {SEO_PAGES_LIST.filter(p => p.category === 'senior_long_term').map(page => (
                    <li key={page.slug}>
                      <a 
                        href={`/${page.slug}`} 
                        onClick={(e) => { e.preventDefault(); setCurrentPath(`/${page.slug}`); }}
                        className="hover:text-teal-400 hover:underline transition-colors"
                      >
                        {page.keyword}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-slate-300 font-bold mb-3 uppercase tracking-wider">Prontuário & Nuvem</h5>
                <ul className="space-y-2">
                  {SEO_PAGES_LIST.filter(p => p.category === 'nuvem_tecnico').map(page => (
                    <li key={page.slug}>
                      <a 
                        href={`/${page.slug}`} 
                        onClick={(e) => { e.preventDefault(); setCurrentPath(`/${page.slug}`); }}
                        className="hover:text-teal-400 hover:underline transition-colors"
                      >
                        {page.keyword}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} SisHOSP Portal. Todos os direitos reservados.</p>
            <div className="flex gap-4">
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade de Acordo com a LGPD regulamentadas pelo SisHOSP.'); }} className="hover:text-slate-400 transition-colors">Termos de Uso</a>
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Políticas de Privacidade de Acordo com a LGPD regulamentadas pelo SisHOSP.'); }} className="hover:text-slate-400 transition-colors">Política de Privacidade</a>
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

export default function App() {
  return (
    <SeoProvider>
      <AppContent />
    </SeoProvider>
  );
}
