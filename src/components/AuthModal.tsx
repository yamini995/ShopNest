import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Lock, Mail, User } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginUser } = useShop();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    if (mode === 'signin') {
      if (password.length < 4) {
        setValidationError('Password must be at least 4 characters.');
        return;
      }
      loginUser(email);
      onClose();
    } else if (mode === 'signup') {
      if (!name.trim()) {
        setValidationError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setValidationError('Password must be at least 6 characters.');
        return;
      }
      loginUser(email, name);
      onClose();
    } else if (mode === 'forgot') {
      setForgotSent(true);
    }
  };

  const handleDemoLogin = () => {
    loginUser('rahul.sharma@example.com', 'Rahul Sharma');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/40 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border border-[#E5E5E2] rounded-[8px] max-w-sm w-full p-6 shadow-md text-center space-y-4">
        <div className="flex justify-between items-center border-b border-[#E5E5E2] pb-3">
          <h2 className="text-base font-bold text-[#1A1A1A]">
            {mode === 'signin' && 'Sign in to ShopNest'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#5C5C5C] hover:text-[#1A1A1A]"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {validationError && (
          <div className="p-2.5 bg-[#F7F7F5] border border-[#DC2626]/30 text-[#DC2626] rounded-[6px] text-xs">
            {validationError}
          </div>
        )}

        {forgotSent ? (
          <div className="space-y-3 py-2">
            <p className="text-xs text-[#5C5C5C]">
              We have sent password reset instructions to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => {
                setForgotSent(false);
                setMode('signin');
              }}
              className="text-xs font-semibold text-[#0F766E] hover:underline"
            >
              Back to sign in
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left text-xs">
            {mode === 'signup' && (
              <div>
                <label className="block text-[#5C5C5C] mb-1 font-medium">
                  Full name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  required
                  className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-[#5C5C5C] mb-1 font-medium">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[#5C5C5C] font-medium">Password</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setValidationError('');
                        setMode('forgot');
                      }}
                      className="text-[11px] text-[#0F766E] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-9 px-3 border border-[#E5E5E2] rounded-[6px] text-[#1A1A1A] focus:border-[#0F766E] focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full h-10 mt-2 bg-[#0F766E] hover:bg-[#115E59] active:translate-y-px text-white font-semibold rounded-[6px] transition-colors"
            >
              {mode === 'signin' && 'Sign in'}
              {mode === 'signup' && 'Create account'}
              {mode === 'forgot' && 'Send reset link'}
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-[#E5E5E2] space-y-2 text-xs">
          <button
            onClick={handleDemoLogin}
            className="w-full h-8 border border-[#E5E5E2] hover:border-[#1A1A1A] text-[#1A1A1A] font-semibold rounded-[6px] transition-colors"
          >
            Quick 1-Click Demo Login (Rahul Sharma)
          </button>

          <div className="text-center text-[11px] text-[#5C5C5C]">
            {mode === 'signin' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    setValidationError('');
                    setMode('signup');
                  }}
                  className="text-[#0F766E] font-semibold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{' '}
                <button
                  onClick={() => {
                    setValidationError('');
                    setMode('signin');
                  }}
                  className="text-[#0F766E] font-semibold hover:underline"
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
