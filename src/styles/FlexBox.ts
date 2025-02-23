// src/styles/FlexBox.ts
import styled from 'styled-components';

interface FlexBoxProps {
  $display?: string;
  $flexDirection?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $gap?: string;
  $marginTop?: string;
  $marginBottom?: string;
  $padding?: string;
}

export const FlexBox = styled.div<FlexBoxProps>`
  display: ${(props) => props.$display || 'flex'};
  flex-direction: ${(props) => props.$flexDirection || 'row'};
  justify-content: ${(props) => props.$justifyContent || 'flex-start'};
  align-items: ${(props) => props.$alignItems || 'stretch'};
  gap: ${(props) => props.$gap || '0'};
  margin-top: ${(props) => props.$marginTop || '0'};
  margin-bottom: ${(props) => props.$marginBottom || '0'};
  padding: ${(props) => props.$padding || '0'};
`;
