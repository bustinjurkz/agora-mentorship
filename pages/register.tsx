import Button from '@mui/material/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import { UserType } from 'components/utils';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
  Language,
  Majors,
  Skills,
  University,
  useGetRegisterInputsQuery,
} from 'generated/graphql';
import { useTheme } from '@mui/material/styles';
import Loading from 'components/Loading';
import ErrorMessage from 'components/ErrorMessage';
import { ProfileEducation } from 'components/register/ProfileEducation';
import { SkillsProfession } from 'components/register/SkillsProfession';
import { MentorSpecific } from 'components/register/MentorSpecific';

const Register: React.FC = () => {
  // TODO https://www.bigbinary.com/react-best-practices/avoid-too-many-state-hooks
  const { data, loading, error } = useGetRegisterInputsQuery();
  const [userType, setUserType] = useState<UserType>();
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    userType: UserType,
  ) => {
    setUserType(userType);
    handleNext();
  };
  const theme = useTheme();
  const isFinished =
    (userType === 'mentor' && activeStep === 3) ||
    (userType === 'mentee' && activeStep === 2);

  const handleCreateUser = () => {
    console.log('got here?');
  };
  const handleNext = () => {
    if (!isFinished) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      handleCreateUser();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderUserType = () => {
    return (
      <>
        <h1 className="sign-up-text">Sign up as a:</h1>
        <div className="buttons">
          <ToggleButtonGroup
            orientation="vertical"
            value={userType}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton
              value="mentee"
              aria-label="list"
              className="mentor button"
            >
              Mentee
            </ToggleButton>
            <ToggleButton
              value="mentor"
              aria-label="module"
              className="mentor button"
            >
              Mentor
            </ToggleButton>
            <ToggleButton
              value="hr"
              aria-label="quilt"
              className="mentor button"
            >
              HR Administrator
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </>
    );
  };

  const displayRegisterStep = () => {
    switch (activeStep) {
      case 0:
        return renderUserType();
      case 1:
        return (
          <ProfileEducation
            languages={
              data?.registerInputs?.language as Pick<
                Language,
                'id' | 'language'
              >[]
            }
            universities={
              data?.registerInputs?.university as Pick<
                University,
                'id' | 'name'
              >[]
            }
            majors={
              data?.registerInputs?.majors as Pick<Majors, 'id' | 'major'>[]
            }
          />
        );
      case 2:
        return (
          <SkillsProfession
            skills={
              data?.registerInputs?.skills as Pick<Skills, 'id' | 'skill'>[]
            }
          />
        );
      case 3:
        return userType === 'mentor' && <MentorSpecific />;
    }
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage msg={'Unknown network error.  Please try again later'} />
    );
  }
  return (
    <RegisterStyle>
      <div className="container">
        <MobileStepper
          variant="dots"
          steps={userType === 'mentor' ? 4 : 3}
          className="stepper"
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <Button
              size="large"
              className="stepper-button"
              style={{ visibility: !userType ? 'hidden' : 'inherit' }}
              onClick={handleNext}
              color="success"
            >
              {userType === 'mentor' && activeStep === 3
                ? 'Finish'
                : userType === 'mentee' && activeStep === 2
                ? 'Finish'
                : 'Next'}
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="large"
              className="stepper-button"
              onClick={handleBack}
              color="warning"
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
        <div className="register-step">{displayRegisterStep()}</div>
      </div>
    </RegisterStyle>
  );
};

export default Register;

const RegisterStyle = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-evenly;
  .container {
    .stepper {
      background: ${({ theme }) => theme.white};
    }
  }
  .stepper-button {
    font-size: larger;
  }
  .sign-up-text {
    margin-bottom: 50px;
  }
  .buttons {
    display: flex;
    flex-direction: column;
  }
  .button {
    width: 330px;
    height: 60px;
    font-weight: 600;
    font-size: 20px;
  }

  .mentee {
    margin: 50px 0px;
  }
`;
