'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from '../ui/Button';
import { FlexBox } from '@/styles/FlexBox';

interface LayoutProps {
  children: ReactNode;
  $maxWidth?: string;
}

interface LayoutContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $maxWidth?: string;
}

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 16px;
`;

const Content = styled.div<LayoutContainerProps>`
  width: 100%;
  max-width: ${(props) => props.$maxWidth || '1350px'};

  padding: 16px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Layout: React.FC<LayoutProps> = ({ children, $maxWidth }) => {
  const { token, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <LayoutContainer>
      <Content $maxWidth={$maxWidth}>
        <FlexBox $justifyContent='flex-end'>
          {token && pathname !== '/login' && (
            <Button $variant='secondary' onClick={handleLogout}>
              Sair
            </Button>
          )}
        </FlexBox>
        {children}
      </Content>
    </LayoutContainer>
  );
};
