'use client'

import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f9fa; 
  padding: 16px;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1350px;
  padding: 16px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;
