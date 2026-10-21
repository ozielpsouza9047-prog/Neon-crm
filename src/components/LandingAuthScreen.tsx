import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Users, Lock, Mail, User, Eye, EyeOff, Store as StoreIcon, ExternalLink, Loader2 } from 'lucide-react';
import { Store } from '../types';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from 'firebase/auth';

interface LandingAuthScreenProps {
  onLoginSuccess: () => void;
  onEnterDemoMode: () => void;
  onOpenPublicStore?: (slug: string) => void;
  stores?: Store[];
}

export const LandingAuthScreen: React.FC<LandingAuthScreenProps> = ({ 
  onLoginSuccess, 
  onEnterDemoMode,
  onOpenPublicStore,
  stores = []
}) => {
  const [authMode, setAuthMode] = useState<'landing' | 'login' | 'signup' | 'forgot'>('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('Por favor, preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMsg = 'Erro ao realizar login. Verifique suas credenciais.';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        errorMsg = 'E-mail ou senha incorretos.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMsg = 'Muitas tentativas sem sucesso. Tente novamente mais tarde.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'E-mail com formato inválido.';
      }
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }
    if (password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      onLoginSuccess();
    } catch (err: any) {
      console.error('Signup error:', err);
      let errorMsg = 'Erro ao criar conta. Tente novamente.';
      if (err.code === 'auth/email-already-in-use') {
        errorMsg = 'Este e-mail já está cadastrado.';
      } else if (err.code === 'auth/weak-password') {
        errorMsg = 'A senha é muito fraca.';
      } else if (err.code === 'auth/invalid-email') {
        errorMsg = 'E-mail com formato inválido.';
      }
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setMessage('Informe seu e-mail para recuperar a senha.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage('Instruções de redefinição enviadas para seu e-mail!');
      setTimeout(() => {
        setAuthMode('login');
        setMessage('');
      }, 3000);
    } catch (err: any) {
      console.error('Password reset error:', err);
      let errorMsg = 'Erro ao enviar e-mail de recuperação.';
      if (err.code === 'auth/user-not-found') {
        errorMsg = 'Nenhum usuário encontrado com este e-mail.';
      }
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07050f] text-slate-100 flex flex-col justify-between relative overflow-hidden select-none font-sans">
      {/* Background glowing ambient elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header / Logo */}
      <header className="w-full px-6 py-6 md:px-12 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-white tracking-wide">Nexus CRM</h1>
            <p className="text-xs text-purple-400 font-medium tracking-wider">Gestão Inteligente</p>
          </div>
        </div>

        {authMode === 'landing' && (
          <div className="flex items-center gap-3">
            <button
              onClick={onEnterDemoMode}
              className="px-4 py-2 rounded-xl text-xs font-bold text-amber-300 hover:text-white bg-amber-950/40 border border-amber-500/40 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all flex items-center gap-1.5"
              title="Acesso provisório isolado para testes"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Modo Teste</span>
            </button>
            <button
              onClick={() => setAuthMode('login')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-purple-200 hover:text-white bg-purple-950/40 border border-purple-900/50 hover:border-purple-500/50 transition-all"
            >
              Entrar
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all"
            >
              Criar Conta
            </button>
          </div>
        )}
      </header>

      {/* Main Content Body */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 z-20">
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left / Center Intro (when in landing mode) */}
          {authMode === 'landing' && (
            <>
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-800/50 text-purple-300 text-xs font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Zap className="w-3.5 h-3.5 text-purple-400" />
                  <span>Powered by AI & Cloud CRM</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Seus clientes, <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">sua evolução.</span>
                </h2>

                <p className="text-sm sm:text-base text-purple-200/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Gerencie clientes, agendamentos e vendas em um só lugar. A plataforma definitiva para impulsionar o seu negócio com inteligência e elegância.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={() => setAuthMode('login')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-3 group"
                  >
                    <span>Entrar</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setAuthMode('signup')}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#130f24] border border-purple-800/50 text-purple-200 font-extrabold text-sm hover:text-white hover:bg-purple-950/40 hover:border-purple-500/60 transition-all"
                  >
                    Criar minha conta
                  </button>
                </div>

                {/* Botão de Acesso Provisório de Teste */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/30 via-purple-950/40 to-blue-950/30 border border-amber-500/30 backdrop-blur-sm space-y-2">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        onClick={onEnterDemoMode}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] group"
                      >
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        <span>Entrar em modo de demonstração</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
                      </button>
                      <span className="text-[11px] text-amber-300/80 font-medium text-center sm:text-right">
                        Ambiente de teste provisório para avaliação do painel e módulos
                      </span>
                    </div>
                  </div>
                </div>
                {/* Vitrines Públicas Demonstrativas */}
                {onOpenPublicStore && stores.length > 0 && (
                  <div className="pt-2">
                    <div className="p-3.5 rounded-2xl bg-purple-950/20 border border-purple-800/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                          <StoreIcon className="w-3.5 h-3.5 text-purple-400" />
                          Vitrines Públicas das Lojas:
                        </span>
                        <span className="text-[10px] text-purple-400/70">Acesso público sem login</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {stores.map(s => (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => onOpenPublicStore(s.slug)}
                            className="px-3 py-1.5 rounded-xl bg-[#140e2b] hover:bg-purple-900/40 border border-purple-800/40 text-purple-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all group"
                          >
                            <span>{s.name}</span>
                            <ExternalLink className="w-3 h-3 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  <button
                    onClick={() => setAuthMode('forgot')}
                    className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </div>

              {/* Right: Modern AI & Client Management Visual Element */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl pointer-events-none" />
                <div className="w-full bg-[#120e26]/90 border border-purple-800/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.25)] relative overflow-hidden backdrop-blur-md space-y-6">
                  <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-mono text-purple-400">nexus-ai-engine.v2</span>
                  </div>

                  {/* AI Visual Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/60 to-[#181230] border border-purple-800/40 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Análise Preditiva de Clientes</h4>
                        <p className="text-[11px] text-purple-300/70">+28% novos clientes este mês</p>
                      </div>
                    </div>
                    <div className="w-full bg-[#0d0918] h-2 rounded-full overflow-hidden border border-purple-900/40">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[84%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/30">
                      <p className="text-[10px] text-purple-400 uppercase font-semibold">Vendas Hoje</p>
                      <h4 className="text-lg font-extrabold text-emerald-400 mt-0.5">R$ 2.450,00</h4>
                    </div>
                    <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-900/30">
                      <p className="text-[10px] text-purple-400 uppercase font-semibold">Atendimentos</p>
                      <h4 className="text-lg font-extrabold text-blue-400 mt-0.5">18 Agendados</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-purple-300 bg-purple-950/60 px-3 py-2 rounded-xl border border-purple-900/40">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Ambiente seguro com criptografia de ponta a ponta</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* LOGIN FORM VIEW */}
          {authMode === 'login' && (
            <div className="lg:col-span-6 lg:col-start-4 bg-[#120e26]/95 border border-purple-800/60 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] backdrop-blur-md animate-in fade-in zoom-in-95">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-white">Bem-vindo de volta</h3>
                <p className="text-xs text-purple-300 mt-1">Acesse seu painel Nexus CRM</p>
              </div>

              {message && (
                <div className="mb-4 p-3 rounded-xl bg-purple-950/80 border border-purple-600/50 text-xs text-purple-200 text-center font-medium">
                  {message}
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="oziel@salaobeleza.com"
                      className="w-full bg-[#181230] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-[#181230] border border-purple-900/60 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    Esqueci minha senha
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="text-purple-300 hover:text-white font-semibold"
                  >
                    Criar conta
                  </button>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAuthMode('landing')}
                    className="w-1/3 py-3 rounded-xl bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40 text-sm font-bold transition-all"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:from-purple-500 hover:to-indigo-500 transition-all"
                  >
                    Entrar no Sistema
                  </button>
                </div>

                <div className="pt-2 text-center border-t border-purple-900/30">
                  <button
                    type="button"
                    onClick={onEnterDemoMode}
                    className="text-xs text-amber-300 hover:text-amber-200 font-semibold transition-colors"
                  >
                    ⚡ Deseja apenas avaliar o painel? <span className="underline">Acessar Modo Teste</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SIGNUP FORM VIEW */}
          {authMode === 'signup' && (
            <div className="lg:col-span-6 lg:col-start-4 bg-[#120e26]/95 border border-purple-800/60 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] backdrop-blur-md animate-in fade-in zoom-in-95">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-white">Criar Nova Conta</h3>
                <p className="text-xs text-purple-300 mt-1">Comece a gerenciar seus clientes com IA</p>
              </div>

              {message && (
                <div className="mb-4 p-3 rounded-xl bg-purple-950/80 border border-purple-600/50 text-xs text-purple-200 text-center font-medium">
                  {message}
                </div>
              )}

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Oziel Pereira"
                      className="w-full bg-[#181230] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">E-mail Profissional</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="oziel@salaobeleza.com"
                      className="w-full bg-[#181230] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Senha de Acesso</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full bg-[#181230] border border-purple-900/60 rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAuthMode('landing')}
                    className="w-1/3 py-3 rounded-xl bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40 text-sm font-bold transition-all"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:from-purple-500 hover:to-indigo-500 transition-all"
                  >
                    Criar Conta & Entrar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {authMode === 'forgot' && (
            <div className="lg:col-span-6 lg:col-start-4 bg-[#120e26]/95 border border-purple-800/60 rounded-3xl p-8 shadow-[0_0_60px_rgba(168,85,247,0.3)] backdrop-blur-md animate-in fade-in zoom-in-95">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-extrabold text-white">Recuperar Senha</h3>
                <p className="text-xs text-purple-300 mt-1">Enviaremos um link de redefinição para seu e-mail</p>
              </div>

              {message && (
                <div className="mb-4 p-3 rounded-xl bg-purple-950/80 border border-purple-600/50 text-xs text-purple-200 text-center font-medium">
                  {message}
                </div>
              )}

              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">E-mail Cadastrado</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400/60" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="oziel@salaobeleza.com"
                      className="w-full bg-[#181230] border border-purple-900/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-purple-400/40 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="w-1/3 py-3 rounded-xl bg-purple-950/40 text-purple-300 hover:text-white border border-purple-900/40 text-sm font-bold transition-all"
                  >
                    Voltar ao Login
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:from-purple-500 hover:to-indigo-500 transition-all"
                  >
                    Enviar Instruções
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* Discrete Footer */}
      <footer className="w-full px-6 py-6 border-t border-purple-900/30 text-center text-xs text-purple-400/70 z-25 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>Nexus CRM © 2026 — Todos os direitos reservados.</p>
        <div className="flex items-center gap-4 text-purple-300/80">
          <span className="hover:text-white cursor-pointer transition-colors">Termos de Uso</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacidade</span>
          <span>•</span>
          <span className="hover:text-white cursor-pointer transition-colors">Suporte</span>
        </div>
      </footer>
    </div>
  );
};
