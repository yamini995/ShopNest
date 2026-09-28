import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, User, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginUser, showToast } = useShop();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'login') {
      if (!email.includes('@') || password.length < 4) {
        setError('Please enter a valid email and password (min 4 characters).');
        return;
      }
      loginUser(email);
      onClose();
    } else if (mode === 'signup') {
      if (!name.trim() || !email.includes('@') || password.length < 6) {
        setError('Please fill in your name, valid email, and a secure password (min 6 chars).');
        return;
      }
      loginUser(email, name);
      onClose();
    } else if (mode === 'forgot') {
      if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      setResetSent(true);
      showToast('Reset Link Sent', `Password reset instructions sent to ${email}`, 'info');
    }
  };

  const handleDemoLogin = () => {
    loginUser('alex.morgan@shopnest.com', 'Alex Morgan');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-sm">
              S
            </div>
            <div>
              <span className="font-extrabold text-sm block">ShopNest Account</span>
              <span className="text-[10px] text-slate-400">Secure Client Access</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-6 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {mode === 'login' && 'Sign in to ShopNest'}
              {mode === 'signup' && 'Create your ShopNest account'}
              {mode === 'forgot' && 'Reset your password'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {mode === 'login' && 'Enter your credentials to manage orders, wishlist, and cart.'}
              {mode === 'signup' && 'Join ShopNest for exclusive deals and express delivery.'}
              {mode === 'forgot' && 'Enter your registered email to receive a password reset link.'}
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
              {error}
            </div>
          )}

          {mode === 'forgot' && resetSent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl text-center space-y-3">
              <KeyRound className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="font-medium">
                We sent a password reset email to <strong className="font-mono">{email}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setResetSent(false);
                }}
                className="text-xs font-semibold text-emerald-700 underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'signup' && (
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-slate-700 font-semibold block">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setError('');
                        }}
                        className="text-[11px] text-emerald-700 hover:underline font-medium"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-slate-400 font-mono"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm text-xs mt-2"
              >
                <span>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'signup' && 'Create Free Account'}
                  {mode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Quick Demo Login Option */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button
              onClick={handleDemoLogin}
              className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              One-Click Test Drive (Demo Account)
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="text-center text-xs text-slate-500 pt-1">
            {mode === 'login' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="font-bold text-slate-900 hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="font-bold text-slate-900 hover:underline"
                >
                  Sign in here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
