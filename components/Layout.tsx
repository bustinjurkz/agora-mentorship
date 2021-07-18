import React from 'react';
import styled from 'styled-components';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutStyle id="main">
      <ChildrenStyle>{children}</ChildrenStyle>
    </LayoutStyle>
  );
};

export default Layout;

const LayoutStyle = styled.div`
  position: absolute;
  height: calc(100% - 100px); /* subtract navbar height */
  width: 100%;
  overflow: auto;
`;

const ChildrenStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 90px;
`;
