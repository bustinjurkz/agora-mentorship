/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Button from '@material-ui/core/Button/Button';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';

const Navbar: React.FC = () => {
  const router = useRouter();
  const returnHome = () => {
    router.push(`/`, `/`);
  };

  return (
    <NavbarStyle>
      <h1
        className="title"
        onClick={() => returnHome()}
        onKeyDown={() => returnHome()}
      >
        Agora Mentoring
      </h1>
      <div className="nav-buttons">
        <Button className="item">How it Works</Button>
        <Button className="item">About</Button>
        <Button className="item">Contact</Button>
        <Button size={'large'} className="sign-up">
          Sign Up
        </Button>
      </div>
    </NavbarStyle>
  );
};

export default Navbar;

const NavbarStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0px 50px;
  background-color: ${({ theme }) => theme.mainGreen};

  .title {
    color: ${({ theme }) => theme.white};
    cursor: pointer;
  }
  .nav-buttons {
    display: inline-flex;
    align-items: center;

    .item {
      margin: 0px 17px;
      color: ${({ theme }) => theme.white};
    }
    .sign-up {
      background: ${({ theme }) => theme.white};
      color: ${({ theme }) => theme.mainGreen};
      margin-left: 17px;
      width: 140px;
      font-weight: 600;
    }
  }
`;
