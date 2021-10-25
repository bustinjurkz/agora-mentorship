import Button from '@mui/material/Button';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';

const LandingPage: React.FC = () => {
  const router = useRouter();
  return (
    <LandingPageStyle>
      <div className="landing-wrapper">
        <h1 className="tagline">Mentoring Made Easy</h1>
        <div className="tagline-description">
          Our all-in-one solution uses artificial intelligence to help your
          organization's mentees find the right mentors to connect with so they
          can gain knowledge of what skills and insights are vital to help them
          reach the next step in their professional journey.
        </div>
        <div className="buttons">
          <Button
            size={'large'}
            className="demo"
            variant="contained"
            disableElevation
          >
            Get a Demo
          </Button>
          <Button
            size={'large'}
            className="login"
            variant="outlined"
            disableElevation
            onClick={() => router.push(`/login`, `/login`)}
          >
            Login
          </Button>
          <Button
            size={'large'}
            className="register"
            variant="outlined"
            disableElevation
            onClick={() => router.push(`/register`, `/register`)}
          >
            Register
          </Button>
        </div>
      </div>
      <div className="image-container"></div>
    </LandingPageStyle>
  );
};

export default LandingPage;

const LandingPageStyle = styled.div`
  display: flex;
  margin-top: 100px;
  justify-content: space-between;
  .image-container {
    align-self: center;
    background: grey;
    height: 400px;
    width: 400px;
  }
  .landing-wrapper {
    align-self: center;
    max-width: 600px;
    margin-right: 100px;
    .tagline {
      font-size: 60px;
    }
    .tagline-description {
      font-size: large;
      margin-bottom: 90px;
    }
  }
  .buttons {
    display: inline-flex;
    .demo {
      background-color: ${({ theme }) => theme.TDGreen};
      color: ${({ theme }) => theme.white};
    }
    .login {
      margin: 0px 30px;
    }
    .register,
    .login {
      color: ${({ theme }) => theme.orange};
    }
    .demo,
    .register,
    .login {
      width: 200px;
      height: 60px;
      font-size: large;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;
