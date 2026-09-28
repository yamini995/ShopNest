import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none text-left">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 bg-[#FFFFFF] text-[#1A1A1A] rounded-[6px] shadow-sm border border-[#E5E5E2] transition-opacity duration-200"
        >
          {toast.type === 'success' && (
            <CheckCircle2 size={18} strokeWidth={1.5} className="text-[#0F766E] shrink-0 mt-0.5" />
          )}
          {toast.type === 'warning' && (
            <AlertCircle size={18} strokeWidth={1.5} className="text-[#F97316] shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Info size={18} strokeWidth={1.5} className="text-[#0F766E] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#1A1A1A] leading-snug">{toast.title}</h4>
            <p className="text-xs text-[#5C5C5C] mt-0.5">{toast.message}</p>

            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  dismissToast(toast.id);
                }}
                className="mt-1.5 text-xs font-bold text-[#0F766E] hover:underline"
              >
                {toast.action.label}
              </button>
            )}
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#5C5C5C] hover:text-[#1A1A1A] transition-colors p-0.5 -mr-1"
            aria-label="Close notification"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
      ))}
    </div>
  );
};
