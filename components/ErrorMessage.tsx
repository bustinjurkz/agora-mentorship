import React from 'react';
import styled from 'styled-components';

export interface ErrorProps {
  msg?: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ msg }) => {
  return (
    <ErrorStyle>
      <h2>{msg}</h2>
    </ErrorStyle>
  );
};
export default ErrorMessage;

const ErrorStyle = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
