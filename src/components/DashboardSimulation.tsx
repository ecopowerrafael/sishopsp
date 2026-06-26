import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Landmark, Users, Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle2, LayoutDashboard, Database, TrendingDown } from 'lucide-react';

interface DashboardSimulationProps {
  onOpenDemo: (challenge?: string) => void;
}

export default function DashboardSimulation({ onOpenDemo }: DashboardSimulationProps) {
  const [activeTab, setActiveTab] = useState<'billing' | 'attendance' | 'waiting'>('billing');

  // Realistic data showcasing transitions from Manual/Other Systems to SisHOSP (deployed in Month 4)
  const billingData = [
    { name: 'Jan (Sem SisHOSP)', glosas: 8.5, faturamento: 125000 },
    { name: 'Fev (Sem SisHOSP)', glosas: 9.2, faturamento: 118000 },
    { name: 'Mar (Sem SisHOSP)', glosas: 7.8, faturamento: 132000 },
    { name: 'Abr (SisHOSP Implat.)', glosas: 3.5, faturamento: 145000 },
    { name: 'Mai (Com SisHOSP)', glosas: 1.1, faturamento: 156000 },
    { name: 'Jun (Com SisHOSP)', glosas: 0.4, faturamento: 162000 },
  ];

  const attendanceData = [
    { name: 'Fisioterapia', semSishosp: 24, comSishosp: 6 },
    { name: 'Fonoaudiologia', semSishosp: 18, comSishosp: 4 },
    { name: 'Terapia Ocupacional', semSishosp: 22, comSishosp: 5 },
    { name: 'Psicologia/ABA', semSishosp: 15, comSishosp: 3 },
    { name: 'Psicopedagogia', semSishosp: 20, comSishosp: 5 },
  ];

  const waitingListData = [
    { name: 'Fisioterapia Motora', diasSem: 140, diasCom: 35 },
    { name: 'Fonoaudiologia / ABA', diasSem: 210, diasCom: 48 },
    { name: 'Terapia Ocupacional', diasSem: 180, diasCom: 40 },
    { name: 'Psicopedagogia Clínica', diasSem: 120, diasCom: 28 },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-100" id="dashboard-demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-600 font-display font-bold text-xs uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-100/50">
            O SisHOSP em Ação
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mt-4 mb-4">
            Gestão visual baseada em dados reais de atendimento
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Nossos clientes abandonaram as pilhas de prontuários em papel por decisões estratégicas em tempo real. Veja a simulação de como seus indicadores evoluirão:
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-5xl mx-auto" id="dashboard-frame-container">
          
          {/* Header of Simulated Workspace */}
          <div className="bg-blue-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-blue-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center text-white">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                  Painel de Indicadores SisHOSP
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] px-2 py-0.5 rounded uppercase tracking-wider font-sans font-bold">
                    Demo ao Vivo
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Dados simulados baseados no histórico de migração dos últimos 12 meses.</p>
              </div>
            </div>

            {/* Dashboard Workspace Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('billing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'billing'
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-800/50'
                }`}
              >
                Faturamento & Glosas
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'attendance'
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-800/50'
                }`}
              >
                Absenteísmo (Faltas)
              </button>
              <button
                onClick={() => setActiveTab('waiting')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'waiting'
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white bg-slate-800/50'
                }`}
              >
                Fila de Espera SUS
              </button>
            </div>
          </div>

          {/* Interactive content area */}
          <div className="p-6 sm:p-8 min-h-[420px]">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Billing & Rejections */}
              {activeTab === 'billing' && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-4 text-left">
                    <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-1 rounded font-display uppercase border border-teal-100">
                      Glosas de BPA-I e APAC
                    </span>
                    <h4 className="text-xl font-display font-bold text-slate-900 mt-3 mb-2">
                      Queda de Glosas para menos de 0.5%
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      Com validações automáticas de inconsistência de dados do paciente no ato da digitação, o SisHOSP impede o faturamento de APACs ou guias TISS inválidas, resultando em recebimento garantido.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Validador do CNS integrado</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Regras SUS atualizadas em nuvem</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Estorno automático facilitado</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={billingData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorGlosas" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} label={{ value: 'Taxa de Glosa (%)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b', offset: 5 }} />
                          <Tooltip formatter={(value) => [`${value}%`, 'Glosa Estimada']} />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                          <Area type="monotone" dataKey="glosas" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGlosas)" name="Percentual de Glosas/Rejeições" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Absence/No-Shows */}
              {activeTab === 'attendance' && (
                <motion.div
                  key="attendance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-4 text-left">
                    <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-1 rounded font-display uppercase border border-teal-100">
                      Redução de Absenteísmo
                    </span>
                    <h4 className="text-xl font-display font-bold text-slate-900 mt-3 mb-2">
                      Faltas reduzidas em até 80%
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      Ao acionar lembretes de consultas automáticos via WhatsApp e permitir cancelamentos rápidos, o SisHOSP reordena instantaneamente as vagas ociosas para pacientes da Fila de Espera.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Confirmação via WhatsApp</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Remanejamento de vaga em tempo real</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Frequência por código de barras ou biometria</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={attendanceData}
                          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} label={{ value: 'Percentual de Faltas (%)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748b' }} />
                          <Tooltip formatter={(value) => [`${value}%`, 'Faltas']} />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                          <Bar dataKey="semSishosp" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Sem SisHOSP (Média de Faltas)" />
                          <Bar dataKey="comSishosp" fill="#dc2626" radius={[4, 4, 0, 0]} name="Com SisHOSP (Média de Faltas)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Waiting Queue Clearance */}
              {activeTab === 'waiting' && (
                <motion.div
                  key="waiting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-4 text-left">
                    <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-1 rounded font-display uppercase border border-teal-100">
                      Regulação & Fila de Espera
                    </span>
                    <h4 className="text-xl font-display font-bold text-slate-900 mt-3 mb-2">
                      Fila de Espera 4x mais Ágil
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                      A regulação inteligente agrupa as necessidades diagnósticas e cruza dados de profissionais qualificados disponíveis. Reduza o tempo ocioso que deixa assistidos esperando por meses.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Fila autorregulada por criticidade</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Agendamento de prioridade automática</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Preenchimento cirúrgico de ociosidade</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={waitingListData}
                          layout="vertical"
                          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                          <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} label={{ value: 'Tempo de Espera Médio (Dias)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#64748b' }} />
                          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} tickLine={false} width={100} />
                          <Tooltip formatter={(value) => [`${value} dias`, 'Tempo']} />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                          <Bar dataKey="diasSem" fill="#cbd5e1" radius={[0, 4, 4, 0]} name="Média de Espera (Antes)" />
                          <Bar dataKey="diasCom" fill="#dc2626" radius={[0, 4, 4, 0]} name="Média de Espera (Com SisHOSP)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom Call to Action Frame */}
          <div className="bg-blue-900 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-blue-800">
            <div className="flex items-center gap-2 text-left">
              <Database className="w-5 h-5 text-teal-400 shrink-0" />
              <span className="text-xs text-slate-300">Quer migrar seus dados de outro sistema sem dores de cabeça? Fazemos toda a carga!</span>
            </div>
            <button
              onClick={() => onOpenDemo()}
              className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-md flex items-center gap-1.5 shrink-0"
              id="dashboard-simulator-cta-modal"
            >
              Falar com Técnico de Migração
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
