import Button from '@material-ui/core/Button/Button';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const LandingPage: React.FC = () => {
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
            className="sign-up"
            variant="outlined"
            disableElevation
          >
            Sign Up
          </Button>
        </div>
      </div>
      <Image
        src="/landing-image.jpg"
        alt={'instructions'}
        width={1050}
        height={700}
      />
    </LandingPageStyle>
  );
};

export default LandingPage;

const LandingPageStyle = styled.div`
  display: flex;
  margin-top: 100px;
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
    .demo {
      background-color: ${({ theme }) => theme.TDGreen};
      color: ${({ theme }) => theme.white};
      margin-right: 30px;
    }
    .sign-up {
      color: ${({ theme }) => theme.orange};
    }
    .demo,
    .sign-up {
      width: 200px;
      height: 60px;
      font-size: large;
      font-weight: 600;
      letter-spacing: 1px;
    }
  }
`;
