import { useState } from "react";

export const useConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [message, setMessage] = useState('');

  const open = (message: string, onConfirmAction: () => void) => {
    setMessage(message);
    setOnConfirm(() => onConfirmAction);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setOnConfirm(null);
  };

  return {
    isOpen,
    message,
    open,
    close,
    onConfirm: () => {
      if (onConfirm) onConfirm();
      close();
    },
  };
};
