import Button from '@mui/material/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DegreeType, renderAlert, UserType } from 'components/utils';
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
  useCreateUserMutation,
  useGetRegisterInputsQuery,
} from 'generated/graphql';
import { useTheme } from '@mui/material/styles';
import Loading from 'components/Loading';
import ErrorMessage from 'components/ErrorMessage';
import { ProfileEducation } from 'components/register/ProfileEducation';
import { SkillsProfession } from 'components/register/SkillsProfession';
import { MentorSpecific } from 'components/register/MentorSpecific';
import { useSetState } from 'react-use';
import LinearProgress from '@mui/material/LinearProgress';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/dist/client/router';

const Register: React.FC = () => {
  const { data, loading, error } = useGetRegisterInputsQuery();
  const [creatingUser, setCreatingUser] = useState(false);
  const [userType, setUserType] = useState<UserType>();
  const [activeStep, setActiveStep] = useState(0);
  const [times, setTimes] = useState<Date[]>([]);
  const [registerState, setRegisterState] = useSetState({
    fullName: '',
    email: '',
    birthYear: '',
    userLanguage: [],
    userUniversity: [],
    userMajor: [],
    userDegree: '' as DegreeType,
    yearsExperience: '',
    primaryRole: '',
    secondaryRole: '',
    userSkills: [],
    userServices: [],
    bio: 'this is my bio',
  });

  const handleChange = (
    //@ts-ignore
    event: React.MouseEvent<HTMLElement>,
    userType: UserType,
  ) => {
    setUserType(userType);
    handleNext();
  };
  const theme = useTheme();
  const router = useRouter();
  const returnHome = () => {
    router.push(`/`, `/`);
  };
  const [createUser] = useCreateUserMutation({
    variables: {
      input: {
        email: registerState.email,
        password: '1111',
        language: registerState.userLanguage,
        majors: registerState.userMajor,
        skills: registerState.userSkills,
        university: registerState.userUniversity,
        mentee:
          userType === 'mentee'
            ? {
                birthyear: parseInt(registerState.birthYear),
                name: registerState.fullName,
                preferred_services: registerState.userServices,
                years_experience: parseInt(registerState.yearsExperience),
                bio: registerState.bio,
                degree_type: registerState.userDegree,
                school_year: 2020,
                job_title_primary: registerState.primaryRole,
                job_title_secondary: registerState.secondaryRole,
              }
            : undefined,
        mentor:
          userType === 'mentor'
            ? {
                birthyear: parseInt(registerState.birthYear),
                name: registerState.fullName,
                preferred_services: registerState.userServices,
                years_experience: parseInt(registerState.yearsExperience),
                bio: registerState.bio,
                degree_type: registerState.userDegree,
                school_year: 2020,
                job_title_primary: registerState.primaryRole,
                job_title_secondary: registerState.secondaryRole,
                availability: times,
              }
            : undefined,
      },
    },
  });
  const handleCreateUser = () => {
    setCreatingUser(true);
    createUser()
      .then((e) => {
        if (e.errors) {
          renderAlert('Failed to register.  Please contact support.', 'error');
          setCreatingUser(false);
          returnHome();
        }
        setCreatingUser(false);
        returnHome();
        renderAlert('Thank you for registering!', 'success');
      })
      .catch(() => {
        setCreatingUser(false);
        returnHome();
        renderAlert('Failed to register.  Please contact support.', 'error');
      });
  };

  const handleNext = () => {
    if (
      (userType === 'mentor' && activeStep === 3) ||
      (userType === 'mentee' && activeStep === 2)
    ) {
      handleCreateUser();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderUserType = () => {
    return (
      <>
        <h1 className="sign-up-text">Select your role</h1>
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
            registerState={registerState}
            setRegisterState={setRegisterState}
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
            registerState={registerState}
            setRegisterState={setRegisterState}
            skills={
              data?.registerInputs?.skills as Pick<Skills, 'id' | 'skill'>[]
            }
          />
        );
      case 3:
        return (
          userType === 'mentor' && (
            <MentorSpecific
              registerState={registerState}
              setRegisterState={setRegisterState}
              times={times}
              setTimes={setTimes}
            />
          )
        );
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
        {!creatingUser && (
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
                {creatingUser ? (
                  <CircularProgress />
                ) : userType === 'mentor' && activeStep === 3 ? (
                  'Finish'
                ) : userType === 'mentee' && activeStep === 2 ? (
                  'Finish'
                ) : (
                  'Next'
                )}
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
                color="error"
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
        )}

        <div className="register-step">
          {creatingUser ? (
            <div className="creating-user">
              <h2>Creating your profile...</h2>
              <LinearProgress color="inherit" />
            </div>
          ) : (
            displayRegisterStep()
          )}
        </div>
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
    width: 1000px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .stepper {
      width: -webkit-fill-available;
      background: transparent;
    }
    .register-step {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      width: 800px;
      .inputs-container {
        justify-content: space-between;
      }
    }
  }
  .stepper-button {
    font-size: larger;
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

  .creating-user {
    margin-top: 50px;
  }
`;
