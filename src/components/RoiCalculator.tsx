import { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, ArrowRight, HelpCircle, Clock, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemo: (challenge?: string) => void;
}

export default function RoiCalculator({ onOpenDemo }: RoiCalculatorProps) {
  // Input parameters with defaults
  const [professionals, setProfessionals] = useState(15);
  const [appointments, setAppointments] = useState(1200);
  const [billingErrors, setBillingErrors] = useState(6); // % of glosas
  const [noShowRate, setNoShowRate] = useState(18); // % of no-shows

  // Constants based on average outpatient market metrics in Brazil (SUS/Convênio)
  const AVERAGE_SESSION_VALUE = 65; // R$ average session value

  // Calculations
  const monthlyBillingPotential = appointments * AVERAGE_SESSION_VALUE;
  
  // 1. Loss due to billing errors/glosas
  const monthlyBillingLoss = monthlyBillingPotential * (billingErrors / 100);
  
  // 2. Loss due to idle slots from missed sessions (no-shows)
  const missedSessionsCount = appointments * (noShowRate / 100);
  const monthlyMissedSessionLoss = missedSessionsCount * AVERAGE_SESSION_VALUE;

  // 3. Total current leakage
  const totalMonthlyWaste = monthlyBillingLoss + monthlyMissedSessionLoss;

  // 4. Savings with SisHOSP
  // - SisHOSP reduces billing errors/glosas by 95%
  const savedGlosas = monthlyBillingLoss * 0.95;
  // - SisHOSP reduces no-show vacancy rates by 75% via WhatsApp reminders + Fila de Espera matchmaking
  const savedNoShows = monthlyMissedSessionLoss * 0.75;

  const estimatedMonthlySavings = savedGlosas + savedNoShows;
  const estimatedYearlySavings = estimatedMonthlySavings * 12;

  // 5. Admin hours saved (therapist spends 16 hours/month on paperwork, SisHOSP saves 70% of it)
  const monthlyHoursSavedPerPro = 16 * 0.70;
  const totalMonthlyHoursSaved = Math.round(professionals * monthlyHoursSavedPerPro);

  // Formatting helpers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="calculadora">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-400 font-display font-bold text-xs uppercase tracking-widest bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20">
            Simulador de Eficiência SisHOSP
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mt-4 mb-4">
            Quanto custa a ineficiência administrativa atual na sua clínica?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Glosas desnecessárias, agendas vazias por faltas de última hora e excesso de papelada custam caro. Insira seus números e descubra o impacto financeiro real.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Sliders Configuration */}
          <div className="lg:col-span-6 bg-slate-950/60 p-6 sm:p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
            <h3 className="text-lg font-display font-bold mb-6 text-teal-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Ajuste as métricas da sua clínica
            </h3>

            <div className="space-y-8">
              {/* Professionals Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-300">Nº de Profissionais de Saúde</label>
                  <span className="bg-teal-500/10 text-teal-400 px-2.5 py-0.5 rounded text-xs font-bold">{professionals} terapeutas</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={professionals}
                  onChange={(e) => setProfessionals(parseInt(e.target.value))}
                  className="w-full accent-teal-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Soma de fisioterapeutas, fonoaudiólogos, psicólogos, médicos, etc.</span>
              </div>

              {/* Appointments Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-300">Consultas / Atendimentos por Mês</label>
                  <span className="bg-teal-500/10 text-teal-400 px-2.5 py-0.5 rounded text-xs font-bold">{appointments} atendimentos</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={appointments}
                  onChange={(e) => setAppointments(parseInt(e.target.value))}
                  className="w-full accent-teal-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Sessões totais realizadas ou agendadas na competência mensal.</span>
              </div>

              {/* Glosas Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-300">Taxa Estimada de Glosas / Erros de Guia</label>
                  <span className="bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded text-xs font-bold">{billingErrors}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={billingErrors}
                  onChange={(e) => setBillingErrors(parseInt(e.target.value))}
                  className="w-full accent-red-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Média de APACs rejeitadas ou guias de SADT glosadas pelos convênios por erros.</span>
              </div>

              {/* No-Shows Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-300">Taxa de Absenteísmo (Faltas/Desistências)</label>
                  <span className="bg-red-500/10 text-red-400 px-2.5 py-0.5 rounded text-xs font-bold">{noShowRate}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  value={noShowRate}
                  onChange={(e) => setNoShowRate(parseInt(e.target.value))}
                  className="w-full accent-red-500 h-1 bg-slate-800 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Pacientes que faltam às terapias agendadas sem aviso prévio mínimo.</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center gap-3 bg-red-950/20 p-4 rounded-xl border border-red-500/10">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <p className="text-[11px] sm:text-xs text-slate-300 leading-normal">
                Sua perda financeira mensal atual por ineficiência é de cerca de <strong className="text-red-400">{formatCurrency(totalMonthlyWaste)}</strong>. É hora de estancar este vazamento de recursos!
              </p>
            </div>
          </div>

          {/* ROI Results Side */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            
            {/* Primary Saving Metric */}
            <div className="bg-gradient-to-br from-teal-950 to-slate-950 p-6 sm:p-8 rounded-3xl border border-teal-500/20 shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute top-0 right-0 bg-teal-500/10 text-teal-300 text-xs font-bold font-display px-3 py-1 rounded-bl-xl border-l border-b border-teal-500/20">
                PROJEÇÃO DE RETORNO ANUAL
              </div>
              
              <div>
                <span className="text-[10px] font-bold text-teal-400 tracking-wider uppercase">ECONOMIA ANUAL ESTIMADA</span>
                <div className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight mt-1 mb-2">
                  {formatCurrency(estimatedYearlySavings)}
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md">
                  Economia gerada ao automatizar faturamentos SUS/TISS, acionar lembretes e preencher desistências automaticamente por pareamento de fila.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Economia Mensal</span>
                  <p className="text-lg font-bold text-teal-400 font-display">{formatCurrency(estimatedMonthlySavings)}/mês</p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">Faturamento Salvo</span>
                  <p className="text-lg font-bold text-teal-400 font-display">95% de glosas evitadas</p>
                </div>
              </div>
            </div>

            {/* Hours Saved Metric */}
            <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800/80 flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center shrink-0 border border-teal-500/20">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">TEMPO CLÍNICO RECUPERADO</span>
                <p className="text-lg font-bold text-white font-display mt-0.5">
                  +{totalMonthlyHoursSaved} horas / mês livres de papelada
                </p>
                <p className="text-[11px] text-slate-400 leading-normal mt-0.5">
                  Seus profissionais gastam menos tempo preenchendo guias manuais e mais tempo prestando cuidados e reabilitação de alta qualidade.
                </p>
              </div>
            </div>

            {/* Conversion Trigger */}
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <h4 className="text-sm font-bold text-white font-display">Quer ver a simulação no seu faturamento real?</h4>
                <p className="text-[11px] text-slate-400">Nossa equipe prepara um estudo detalhado para sua instituição.</p>
              </div>
              <button
                onClick={() => onOpenDemo(`Simulou economia de ${formatCurrency(estimatedYearlySavings)} por ano.`)}
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                id="calculator-cta-schedule"
              >
                Garantir Esta Economia
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
