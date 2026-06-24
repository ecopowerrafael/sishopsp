import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, CheckCircle, ArrowRight, ShieldCheck, Download, Sparkles, Building, Phone, Mail, Users, User, Award } from 'lucide-react';
import { LeadFormData } from '../types';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChallenge?: string;
}

export default function DemoModal({ isOpen, onClose, initialChallenge = '' }: DemoModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    clinicName: '',
    role: '',
    professionalsCount: 10,
    mainChallenge: initialChallenge,
    acceptsTerms: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API registration to Portal Sishosp
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3); // Success step
    }, 1500);
  };

  const updateField = (field: keyof LeadFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step === 1 && formData.name && formData.email && formData.phone) {
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            id="modal-backdrop"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
            id="demo-modal-container"
          >
            {/* Left Side: Brand Authority & Benefits */}
            <div className="md:w-5/12 bg-teal-950 p-6 md:p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/10 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="bg-teal-500 text-teal-950 px-2.5 py-1 rounded-md text-xs font-bold tracking-wider uppercase font-display">
                    Sishosp Portal
                  </span>
                  <span className="text-teal-300 text-xs font-medium">• Software Oficial</span>
                </div>
                
                <h3 className="text-2xl font-display font-bold leading-snug mb-4">
                  Transforme a gestão de sua clínica hoje mesmo.
                </h3>
                
                <p className="text-teal-100/90 text-sm mb-6 leading-relaxed">
                  Junte-se a mais de 800 instituições em todo o Brasil que reduziram em até 95% suas glosas de faturamento e zeraram o retrabalho administrativo.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="bg-teal-900 text-teal-400 p-1.5 rounded mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Demonstração Personalizada</p>
                      <p className="text-xs text-teal-200">Apresentação focada na realidade da sua instituição (SUS ou Convênios).</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="bg-teal-900 text-teal-400 p-1.5 rounded mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">100% Conforme Legislação</p>
                      <p className="text-xs text-teal-200">Adequação total à LGPD e regras vigentes do Ministério da Saúde.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="bg-teal-900 text-teal-400 p-1.5 rounded mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Implantação Acompanhada</p>
                      <p className="text-xs text-teal-200">Suporte humanizado e treinamento completo para todo o seu time.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-teal-900 text-xs text-teal-300/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Garantimos total confidencialidade dos seus dados de acordo com a LGPD.</span>
              </div>
            </div>

            {/* Right Side: Step Form */}
            <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1.5 hover:bg-slate-100 rounded-full"
                aria-label="Fechar modal"
                id="close-modal-button"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Bar */}
              {step < 3 && (
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-slate-500 font-medium mb-1.5">
                    <span>Etapa {step} de 2: {step === 1 ? 'Dados de Contato' : 'Sua Clínica'}</span>
                    <span>{step === 1 ? '50%' : '100%'} Concluído</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-teal-500 transition-all duration-300"
                      style={{ width: step === 1 ? '50%' : '100%' }}
                    />
                  </div>
                </div>
              )}

              {/* Form Step 1 */}
              {step === 1 && (
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-xl font-display font-bold text-slate-900 mb-1">
                    Agende sua Consultoria Diagnóstica
                  </h4>
                  <p className="text-sm text-slate-500 mb-6">
                    Insira seus dados para que um especialista de reabilitação entre em contato.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          placeholder="Ex: Dr. Roberto Silva"
                          className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        E-mail de Trabalho
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          placeholder="Ex: roberto@clinicax.com.br"
                          className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        WhatsApp / Telefone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => updateField('phone', e.target.value)}
                          placeholder="Ex: (11) 99999-9999"
                          className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      disabled={!formData.name || !formData.email || !formData.phone}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow"
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Form Step 2 */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
                  <h4 className="text-xl font-display font-bold text-slate-900 mb-1">
                    Conte-nos sobre sua Clínica
                  </h4>
                  <p className="text-sm text-slate-500 mb-6">
                    Ajudará o consultor a preparar telas e simulações do Sishosp com o seu perfil.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Nome da Clínica / Instituição
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={formData.clinicName}
                            onChange={(e) => updateField('clinicName', e.target.value)}
                            placeholder="Ex: APAE Maceió ou Clínica Reabilita"
                            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Seu Cargo
                        </label>
                        <select
                          required
                          value={formData.role}
                          onChange={(e) => updateField('role', e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="">Selecione...</option>
                          <option value="diretor">Diretor / Presidente</option>
                          <option value="administrador">Administrador / Gerente</option>
                          <option value="coordenador">Coordenador Clínico</option>
                          <option value="faturista">Faturista / Faturamento</option>
                          <option value="terapeuta">Terapeuta / Profissional de Saúde</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Principal Desafio no Momento
                      </label>
                      <select
                        required
                        value={formData.mainChallenge}
                        onChange={(e) => updateField('mainChallenge', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Selecione o desafio principal...</option>
                        <option value="glosas">Reduzir Glosas e Erros de Faturamento (BPA-I/APAC/XML)</option>
                        <option value="agendas">Organizar Agendas Multiprofissionais e de Grupos</option>
                        <option value="aba">Prontuário de Reabilitação e Metas de Evolução (ABA/TEA)</option>
                        <option value="fila">Gerenciar Fila de Espera de Pacientes (SUS/Vagas)</option>
                        <option value="presenca">Controle de Frequência dos Pacientes e Assinaturas</option>
                        <option value="outro">Outros Desafios Administrativos</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        <span>Profissionais Ativos na Clínica</span>
                        <span className="text-teal-600 font-display font-bold">{formData.professionalsCount} especialistas</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={formData.professionalsCount}
                        onChange={(e) => updateField('professionalsCount', parseInt(e.target.value))}
                        className="w-full accent-teal-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                        <span>1 profissional</span>
                        <span>50 profissionais</span>
                        <span>100+ profissionais</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 mt-2">
                      <input
                        type="checkbox"
                        id="accepts-terms"
                        checked={formData.acceptsTerms}
                        onChange={(e) => updateField('acceptsTerms', e.target.checked)}
                        className="mt-1 accent-teal-600 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <label htmlFor="accepts-terms" className="text-xs text-slate-500 leading-normal">
                        Concordo em receber comunicações e materiais educativos do Sishosp Portal. Você pode cancelar a inscrição a qualquer momento.
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="text-slate-500 hover:text-slate-700 text-sm font-semibold hover:bg-slate-50 px-4 py-2 rounded-lg transition-all"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.clinicName || !formData.role || !formData.mainChallenge || !formData.acceptsTerms}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                      id="submit-demo-button"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processando...
                        </>
                      ) : (
                        <>
                          Solicitar Demonstração Grátis
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Success Screen */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6 border border-teal-100">
                    <Calendar className="w-8 h-8" />
                  </div>

                  <h4 className="text-2xl font-display font-bold text-slate-900 mb-2">
                    Solicitação Recebida com Sucesso!
                  </h4>
                  
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                    Olá <strong className="text-slate-900">{formData.name}</strong>, nosso consultor especializado em <strong className="text-slate-900">reabilitação e faturamento</strong> entrará em contato em menos de <strong className="text-teal-600">2 horas úteis</strong> pelo WhatsApp no número <span className="font-semibold text-slate-800">{formData.phone}</span>.
                  </p>

                  <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 mb-8 text-left max-w-lg mx-auto">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="p-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase font-display">
                        Bônus de Autoridade
                      </span>
                      <span className="text-xs font-semibold text-slate-700">Material Gratuito Liberado</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1">
                      Manual de Faturamento e Auditoria SUS & Convênios para Clínicas de Reabilitação
                    </h5>
                    <p className="text-xs text-slate-500 mb-4">
                      Evite glosas de APACs e guias de SADT hoje mesmo com o nosso guia prático.
                    </p>
                    <a
                      href="#download-manual"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Seu download do "Manual de Faturamento Sishosp" foi iniciado com sucesso!');
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-lg transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Baixar Manual PDF Grátis
                    </a>
                  </div>

                  <button
                    onClick={onClose}
                    className="text-teal-600 hover:text-teal-700 font-bold text-sm underline decoration-teal-600/30 hover:decoration-teal-700"
                  >
                    Fechar e continuar navegando no Portal
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
