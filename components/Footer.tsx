import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  return (
    <FooterStyle>
      <div className="copyright">© 2021 Agora. All rights reserved.</div>
      <div className="legal">
        <div className="tos">Terms of Service</div>
        <div className="privacy">Privacy Policy</div>
      </div>
    </FooterStyle>
  );
};

export default Footer;

const FooterStyle = styled.div`
  display: inline-flex;
  font-weight: 600;
  font-family: 'Karla', sans-serif;
  margin-top: 50px;
  padding: 20px 0px;
  justify-content: space-between;
  .legal {
    display: inline-flex;
    .tos {
      margin-right: 20px;
    }
    .tos,
    .privacy {
      cursor: pointer;
    }
  }
`;
