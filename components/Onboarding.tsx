import React, { useState, useEffect } from 'react';
import { UserLevel, UserProfile } from '../types';
import { Stethoscope, User, BriefcaseMedical, Target, Rocket, TrendingUp, RefreshCw, Mail, Phone, Lock, CheckCircle2, Loader2, ArrowRight, RotateCcw, X } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [level, setLevel] = useState<UserLevel | null>(null);
  const [motivation, setMotivation] = useState('');
  
  // Verification State
  const [verificationCode, setVerificationCode] = useState(''); // Code entered by user
  const [generatedCode, setGeneratedCode] = useState(''); // Correct code
  const [isSending, setIsSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  
  // Demo UI State
  const [showDemoNotification, setShowDemoNotification] = useState(false);

  // Timer for resend button
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const generateAndSendCode = async (isResend = false) => {
    setIsSending(true);
    setVerificationCode(''); // Clear previous if any
    setShowDemoNotification(false);
    
    // Generate a random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    
    // Simulate Network Delay (API Call to Email Service)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSending(false);
    setResendTimer(30); // 30 seconds cooldown

    // --- DEMO MODE LOGIC ---
    // Auto-fill the code for demonstration purposes
    setVerificationCode(code);
    setShowDemoNotification(true);
    
    // Auto-hide notification after 6 seconds
    setTimeout(() => setShowDemoNotification(false), 6000);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      setStep(4);
      generateAndSendCode(); // Send code when entering step 4
    }
  };

  const handleVerifyAndSubmit = () => {
    // DEMO MODE: Allow the generated code OR the master code '000000'
    if (verificationCode === generatedCode || verificationCode === '000000') {
      if (name && level && motivation && email && phone) {
        const initialProfile: UserProfile = {
          name,
          email,
          phone,
          level,
          motivation,
          xp: 0,
          rank: 'Aprendiz',
          streak: 1,
          completedModules: [],
          badges: []
        };
        onComplete(initialProfile);
      }
    } else {
      alert("❌ Código incorrecto. \n\nPista Demo: Usa 000000 o el código que apareció en la notificación.");
    }
  };

  const motivations = [
    { id: 'entry', text: 'Quiero entrar a la industria farmacéutica', icon: Rocket },
    { id: 'skill', text: 'Mejorar mis habilidades actuales', icon: TrendingUp },
    { id: 'kam', text: 'Ascender a Key Account Manager (KAM)', icon: Target },
    { id: 'change', text: 'Cambio de carrera desde otra industria', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 flex items-center justify-center p-4 relative">
      
      {/* Demo Email Notification Toast */}
      {showDemoNotification && (
        <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top fade-in duration-500 w-[90%] max-w-md">
          <div className="bg-white rounded-lg shadow-2xl border-l-4 border-blue-500 p-4 flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 text-sm">Nuevo Correo Recibido</h4>
                <button onClick={() => setShowDemoNotification(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">De: sistema@mentora-educa.com</p>
              <div className="mt-2 bg-slate-50 p-2 rounded border border-slate-100 text-sm text-slate-700">
                Hola {name}, tu código de acceso es: <span className="font-bold text-blue-600 text-lg">{generatedCode}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full border border-teal-100 relative overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0 opacity-50" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-teal-100 p-4 rounded-full shadow-inner">
              <Stethoscope className="w-12 h-12 text-teal-600" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-slate-800 mb-1">MENTORA EDUCA</h1>
          <p className="text-center text-slate-500 mb-8 text-sm uppercase tracking-wide font-medium">Registro Profesional</p>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'w-8 bg-teal-500' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>

          <div className="space-y-6">
            {/* STEP 1: Personal Data */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right duration-300 space-y-4">
                <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Datos de Contacto</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Nombre Completo</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-slate-50 focus:bg-white"
                      placeholder="Ej: Juan Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Correo Electrónico</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-slate-50 focus:bg-white"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Celular</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                    <input
                      type="tel"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-slate-50 focus:bg-white"
                      placeholder="099 999 9999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Level Selection */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right duration-300">
                <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Tu Nivel Actual</h3>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    onClick={() => setLevel(UserLevel.NOVATO)}
                    className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all hover:scale-[1.02] ${
                      level === UserLevel.NOVATO 
                        ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-md' 
                        : 'border-slate-200 hover:border-teal-200 text-slate-600 bg-white'
                    }`}
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                      <User className="w-6 h-6 text-teal-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Soy Nuevo (Ruta Novato)</div>
                      <div className="text-xs opacity-80">Empiezo desde cero. Guía paso a paso.</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLevel(UserLevel.EXPERIMENTADO)}
                    className={`p-4 rounded-xl border-2 flex items-center gap-4 transition-all hover:scale-[1.02] ${
                      level === UserLevel.EXPERIMENTADO 
                        ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-md' 
                        : 'border-slate-200 hover:border-blue-200 text-slate-600 bg-white'
                    }`}
                  >
                    <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100">
                      <BriefcaseMedical className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Tengo Experiencia (Ruta Pro)</div>
                      <div className="text-xs opacity-80">Retos avanzados, >1 año en campo.</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Motivation */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right duration-300">
                <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Motivación Principal</h3>
                <div className="grid grid-cols-1 gap-3">
                  {motivations.map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMotivation(m.text)}
                        className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all hover:scale-[1.01] ${
                          motivation === m.text
                            ? 'border-purple-500 bg-purple-50 text-purple-900 shadow-sm'
                            : 'border-slate-200 hover:border-purple-200 text-slate-600 bg-white'
                        }`}
                      >
                        <div className={`p-1.5 rounded-md ${motivation === m.text ? 'bg-purple-100' : 'bg-slate-100'}`}>
                           <Icon className={`w-5 h-5 ${motivation === m.text ? 'text-purple-600' : 'text-slate-500'}`} />
                        </div>
                        <span className="font-medium text-sm">{m.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: Email Verification */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right duration-300 text-center">
                
                {isSending ? (
                  <div className="py-12 flex flex-col items-center justify-center">
                    <Loader2 className="w-12 h-12 text-teal-500 animate-spin mb-4" />
                    <h3 className="text-lg font-bold text-slate-700">Enviando código...</h3>
                    <p className="text-sm text-slate-500">Conectando con servidor de correo</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 flex justify-center">
                      <div className="bg-teal-50 p-4 rounded-full border-2 border-teal-100 shadow-sm">
                        <Mail className="w-8 h-8 text-teal-600" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Verifica tu Correo</h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Hemos enviado un código de acceso a:<br/>
                      <span className="font-bold text-slate-800">{email}</span>
                    </p>

                    <div className="mb-6 relative max-w-[200px] mx-auto">
                       <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-300" />
                       <input
                        type="text"
                        maxLength={6}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-teal-500 outline-none text-center text-2xl font-bold tracking-widest text-slate-800 uppercase focus:ring-4 focus:ring-teal-500/10 transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-base placeholder:text-slate-300"
                        placeholder="Código"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        autoFocus
                       />
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                          onClick={handleVerifyAndSubmit}
                          disabled={verificationCode.length !== 6}
                          className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-teal-600/20 transition transform active:scale-95 flex items-center justify-center gap-2"
                        >
                          Verificar e Ingresar
                          <ArrowRight className="w-5 h-5" />
                        </button>

                        <button 
                          onClick={() => generateAndSendCode(true)}
                          disabled={resendTimer > 0}
                          className="text-sm text-slate-500 hover:text-teal-600 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          {resendTimer > 0 ? `Reenviar en ${resendTimer}s` : 'Reenviar código'}
                        </button>
                    </div>

                    <div className="mt-6 bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex items-start gap-3 text-left">
                       <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                       <p className="text-xs text-blue-800 leading-relaxed">
                         <strong>Modo Demo Activo:</strong> El código se ha autocompletado para facilitar tu acceso rápido.
                       </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {step < 4 && (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && (!name || !email || !phone)) || 
                  (step === 2 && !level) || 
                  (step === 3 && !motivation)
                }
                className="w-full mt-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                {step === 3 ? 'Generar Código de Acceso' : 'Siguiente'}
                {step < 3 && <ArrowRight className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;