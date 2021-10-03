import Button from '@mui/material/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { UserType } from 'components/utils';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepLabel } from '@mui/material';

const Register: React.FC = () => {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>();
  const steps = [
    'Select master blaster campaign settings',
    'Create an ad group',
    'Create an ad',
  ];

  return (
    <RegisterStyle>
      <div className="sign-up-wrapper">
        <Stepper activeStep={1} alternativeLabel className="stepper">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <h1 className="sign-up-text">Sign up as a:</h1>
        <div className="buttons">
          <Button
            className="mentor button"
            variant="contained"
            onClick={() => setUserType('mentor')}
          >
            Mentor
          </Button>
          <Button
            className="mentee button"
            variant="contained"
            onClick={() => setUserType('mentee')}
          >
            Mentee
          </Button>
          <Button
            className="hr button"
            variant="contained"
            onClick={() => setUserType('hr')}
          >
            HR Administrator
          </Button>
        </div>
      </div>
    </RegisterStyle>
  );
};

export default Register;

const RegisterStyle = styled.div`
  display: flex;
  margin-top: 80px;
  justify-content: space-evenly;
  .sign-up-text {
    margin-bottom: 50px;
  }
  .buttons {
    display: flex;
    flex-direction: column;
  }
  .button {
    background: ${({ theme }) => theme.TDGreen};
    color: ${({ theme }) => theme.white};
    width: 330px;
    height: 60px;
    font-weight: 600;
    font-size: 20px;
  }

  .mentee {
    margin: 50px 0px;
  }
`;
