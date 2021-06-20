import Button from '@material-ui/core/Button/Button';
import React from 'react';
import styled from 'styled-components';
// import { useRouter } from 'next/router';

const Register: React.FC = () => {
  // const router = useRouter();
  return (
    <RegisterStyle>
      <div className="sign-up-wrapper">
        <h1 className="sign-up-text">Sign up as a:</h1>
        <div className="buttons">
          <Button
            className="mentor button"
            variant="contained"
            disableElevation
          >
            Mentor
          </Button>
          <Button
            className="mentee button"
            variant="contained"
            disableElevation
          >
            Mentee
          </Button>
          <Button className="hr button" variant="contained" disableElevation>
            HR Administrator
          </Button>
        </div>
      </div>
      <div className="profile-info-wrapper">
        <h1 className="form-text">Profile Info</h1>
        <div className="form-helper-text">
          Fill in the data to create your profile Please use your work e-mail
          and identification.
        </div>
        <div className="form-wrapper"></div>
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

  .profile-info-wrapper {
    width: 400px;
    .form-text {
      margin-bottom: 47px;
    }
    .form-helper-text {
      margin-bottom: 40px;
    }
    .form-wrapper {
      height: 400px;
      border: 3px solid #008a00;
      border-radius: 5px;
    }
  }
`;
