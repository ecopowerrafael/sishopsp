import { useState, useEffect, FormEvent } from 'react';
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
  const cleanInitialChallenge = typeof initialChallenge === 'string' ? initialChallenge : '';
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    clinicName: '',
    role: '',
    professionalsCount: 10,
    mainChallenge: cleanInitialChallenge || 'glosas'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset step and challenge when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      const challengeStr = typeof initialChallenge === 'string' ? initialChallenge : '';
      setFormData(prev => ({
        ...prev,
        mainChallenge: challengeStr || prev.mainChallenge || 'glosas'
      }));
    }
  }, [isOpen, initialChallenge]);

  const handleWhatsAppRedirect = (data = formData) => {
    const phone = '5519999478017';
    
    const rolesMap: Record<string, string> = {
      diretor: 'Diretor / Presidente',
      administrador: 'Administrador / Gerente',
      coordenador: 'Coordenador Clínico',
      faturista: 'Faturista / Faturamento',
      terapeuta: 'Terapeuta / Profissional de Saúde',
      outro: 'Outro'
    };
    
    const challengesMap: Record<string, string> = {
      glosas: 'Reduzir Glosas e Erros de Faturamento (BPA-I/APAC/XML)',
      agendas: 'Organizar Agendas Multiprofissionais e de Grupos',
      aba: 'Prontuário de Reabilitação e Metas de Evolução (ABA/TEA)',
      fila: 'Gerenciar Fila de Espera de Pacientes (SUS/Vagas)',
      presenca: 'Controle de Frequência dos Pacientes e Assinaturas',
      outro: 'Outros Desafios Administrativos'
    };

    const roleText = rolesMap[data.role] || data.role;
    const challengeText = challengesMap[data.mainChallenge] || data.mainChallenge;

    const text = `Olá! Gostaria de agendar uma demonstração do SisHOSP.

Seguem meus dados:
- *Nome*: ${data.name}
- *Nome da Clínica*: ${data.clinicName}
- *Cargo*: ${roleText}
- *Principal Desafio*: ${challengeText}
- *Profissionais Ativos*: ${data.professionalsCount}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
    
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.error("Failed to open WhatsApp redirect:", e);
      // Fallback: update location if top window is allowed or just log
      try {
        window.location.href = whatsappUrl;
      } catch (err) {
        console.error("Failed to fallback redirect:", err);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    handleWhatsAppRedirect();
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2); // Step 2 is success/redirection
    }, 800);
  };

  const updateField = (field: keyof LeadFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                    SisHOSP Portal
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

              {/* Form Step 1 */}
              {step === 1 && (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
                  <h4 className="text-xl font-display font-bold text-slate-900 mb-1">
                    Agende sua Consultoria Diagnóstica
                  </h4>
                  <p className="text-sm text-slate-500 mb-6">
                    Insira seus dados para iniciar o contato direto com um especialista de reabilitação no WhatsApp.
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
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.clinicName || !formData.role || !formData.mainChallenge}
                      className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-md hover:shadow-lg"
                      id="submit-demo-button"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Redirecionando...
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

              {/* Step 2: Success Screen */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-6"
                >
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6 border border-teal-100">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h4 className="text-2xl font-display font-bold text-slate-900 mb-2">
                    Redirecionando para o WhatsApp...
                  </h4>
                  
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Olá <strong className="text-slate-900">{formData.name}</strong>, estamos abrindo a conversa com nosso consultor especializado em seu WhatsApp para agendar sua demonstração.
                    <br />
                    Caso o redirecionamento automático não tenha funcionado, clique no botão abaixo para iniciar a conversa:
                  </p>

                  <button
                    onClick={() => handleWhatsAppRedirect()}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg mb-8"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.83.001-2.624-1.023-5.091-2.884-6.955C16.59 1.966 14.135.941 11.999.941c-5.444 0-9.867 4.413-9.87 9.83-.001 1.956.513 3.864 1.492 5.56l-.982 3.585 3.693-.969zm13.111-8.595c-.302-.15-.178-.25-.3-.45-.125-.2-.164-.34-.234-.48-.07-.14-.265-.14-.565-.29-.3-.15-1.78-.875-2.056-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.462.13-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.272.495 1.705.63.717.228 1.369.196 1.885.119.575-.085 1.78-.725 2.03-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
                    </svg>
                    Falar com Consultor no WhatsApp
                  </button>

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
