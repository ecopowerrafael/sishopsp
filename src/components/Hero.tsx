import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, Sparkles, Building2, TrendingUp, Users, Calendar, Award } from 'lucide-react';

interface HeroProps {
  onOpenDemo: (challenge?: string) => void;
}

export default function Hero({ onOpenDemo }: HeroProps) {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-teal-50/50 via-white to-slate-50" id="hero-section">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Pitch */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-teal-100/80 border border-teal-200/50 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-800 mb-6 font-display"
            >
              <Award className="w-4 h-4 text-teal-600" />
              <span>O Software Preferido das APAEs e Centros de Autismo</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight leading-[1.1] mb-5"
            >
              Gestão clínica especializada que reduz <span className="text-teal-600 relative inline-block">
                glosas em até 95%
                <span className="absolute bottom-1 left-0 w-full h-1.5 bg-teal-100 rounded -z-10" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              O <strong>Sishosp</strong> é a solução definitiva em software de saúde para clínicas multiprofissionais de reabilitação, centros de Autismo (método ABA), APAEs e convênios. Centralize agendas, prontuários, faturamento SUS (BPA-I, APAC) e reduza faltas.
            </motion.p>

            {/* Bullet points of authority */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 w-full max-w-lg"
            >
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                <span>Agenda Multiprofissional Integrada</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                <span>Faturamento SUS & Convênios Automatizado</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                <span>Prontuário especializado (ABA/DSM-5)</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle className="w-4.5 h-4.5 text-teal-600 shrink-0" />
                <span>Assinatura Eletrônica & Reconhecimento Facial</span>
              </div>
            </motion.div>

            {/* Conversional CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => onOpenDemo()}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-teal-600/20 hover:shadow-xl hover:translate-y-[-1px] text-center flex items-center justify-center gap-2"
                id="hero-cta-demo"
              >
                Solicitar Demonstração Gratuita
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <a
                href="#calculadora"
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 font-bold px-7 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-sm"
              >
                Simular Economia
                <TrendingUp className="w-4 h-4 text-teal-600" />
              </a>
            </motion.div>

            {/* Proof statistics footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-slate-200/75 grid grid-cols-3 gap-6 w-full text-slate-700"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-teal-600 leading-tight">+800</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide uppercase">Instituições Ativas</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-teal-600 leading-tight">2.5M+</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide uppercase">Prontuários Ativos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-display font-bold text-teal-600 leading-tight">95%</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide uppercase">Redução de Glosas</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Realistic Simulated Interface Mockup */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer decorative shadow */}
              <div className="absolute inset-0 bg-teal-600/5 rounded-3xl blur-3xl -z-10" />

              {/* Mockup Frame (Macbook/Tablet style representation) */}
              <div className="bg-slate-900 rounded-2xl p-2.5 shadow-2xl border border-slate-800">
                <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-900 relative">
                  
                  {/* Top bar simulating clinical application header */}
                  <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="bg-slate-950 px-3 py-0.5 rounded text-[10px] text-slate-400 font-mono tracking-wider flex items-center gap-1 border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                      sishosp-cloud.com.br/clinica-central
                    </div>
                    <div className="w-6" />
                  </div>

                  {/* Simulated App Client UI */}
                  <div className="bg-slate-950 p-4 min-h-[340px] text-slate-300">
                    {/* Header bar */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
                      <div>
                        <span className="text-[9px] font-bold text-teal-400 tracking-wider uppercase">PACIENTE EM ATENDIMENTO</span>
                        <h4 className="text-sm font-bold text-white font-display">Enzo Gabriel Santos (6 anos)</h4>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                        Plano ABA/TEA
                      </span>
                    </div>

                    {/* Quick KPIs Grid */}
                    <div className="grid grid-cols-2 gap-2.5 mb-4">
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9px] text-slate-400 uppercase font-medium">Presença Confirmada</span>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Assinatura Biométrica
                        </div>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-[9px] text-slate-400 uppercase font-medium">Evolução do Dia</span>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                          <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
                          92% de Metas Atingidas
                        </div>
                      </div>
                    </div>

                    {/* Interactive Therapy Progress Area */}
                    <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 mb-4">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                        <span className="font-semibold text-slate-300">Atividade: Coordenação & Foco (DSM-5)</span>
                        <span className="text-teal-400 font-bold">Meta: 4/5 Acertos</span>
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full w-[80%]" />
                        </div>
                        <p className="text-[10px] text-slate-400 italic">"Paciente demonstrou excelente engajamento nas atividades táteis de pinça. Evolução constante."</p>
                      </div>
                    </div>

                    {/* Floating elements simulating system alerts */}
                    <div className="space-y-2">
                      <div className="bg-teal-500/10 text-teal-300 border border-teal-500/20 rounded-lg p-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="p-1 bg-teal-500/20 text-teal-400 rounded">SUS</span>
                          <span>APAC validada! Faturamento garantido para a competência.</span>
                        </div>
                        <span className="text-[9px] font-bold text-teal-400">R$ 1.250,00</span>
                      </div>
                    </div>
                  </div>

                  {/* Dark Mode Overlay Stats overlay for landing page */}
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-t border-slate-800 text-xs">
                    <span className="text-slate-400">Suporte: <strong>0800 591 2341</strong></span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      100% cloud / AWS
                    </span>
                  </div>

                </div>
              </div>

              {/* Floating Absolute Cards on Hero */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -right-6 top-1/4 bg-white p-3.5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[200px] hidden sm:flex"
              >
                <div className="w-9 h-9 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">APAE de Maceió</p>
                  <p className="text-[10px] text-slate-500 leading-none mt-0.5">Gestão sem Papel</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -left-6 bottom-8 bg-white p-3.5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3 max-w-[220px] hidden sm:flex"
              >
                <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-semibold leading-tight uppercase">ERROS DE COBRANÇA</p>
                  <p className="text-xs font-bold text-emerald-600 leading-none mt-0.5">-98% de glosas SUS</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
