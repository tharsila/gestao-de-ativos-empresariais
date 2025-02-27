import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 10px;
`;

const Message = styled.p`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = 'Confirmação',
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonContainer>
          <Button $variant='secondary' onClick={onCancel}>
            Cancelar
          </Button>
          <Button $variant='danger' onClick={onConfirm}>
            Confirmar
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};
