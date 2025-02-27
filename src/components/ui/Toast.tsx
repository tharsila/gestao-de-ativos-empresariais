import styled, { css } from 'styled-components';

export type ToastType = 'success' | 'error' | 'warning';

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastProps {
  messages: ToastMessage[];
}

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  /* bottom: 20px; */
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const toastTypes = {
  success: css`
    background: #4caf50;
    border-left: 5px solid #2e7d32;
  `,
  error: css`
    background: #f44336;
    border-left: 5px solid #c62828;
  `,
  warning: css`
    background: #ff9800;
    border-left: 5px solid #e65100;
  `,
};

const ToastItem = styled.div<{ type: ToastType }>`
  ${({ type }) => toastTypes[type]}
  color: white;
  padding: 12px 16px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 250px;
  max-width: 400px;
  font-size: 14px;
`;

export const Toast = ({ messages }: ToastProps) => {
  return (
    <ToastContainer>
      {messages.map((toast) => (
        <ToastItem key={toast.id} type={toast.type}>
          {toast.message}
        </ToastItem>
      ))}
    </ToastContainer>
  );
};
