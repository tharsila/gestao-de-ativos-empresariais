'use client';

import { Toast, ToastMessage, ToastType } from '@/components/ui/Toast';
import { createContext, useState, ReactNode } from 'react';

interface ToastContextType {
  show: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const show = (message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast messages={toasts} />
    </ToastContext.Provider>
  );
};
