import Button from '@mui/material/Button';
import React, { useState } from 'react';
import styled from 'styled-components';
import { renderAlert } from 'components/utils';
import { useGetUserIdLazyQuery } from 'generated/graphql';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/dist/client/router';
import TextField from '@mui/material/TextField';
import { loginUser } from 'redux/userSlice';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [getUser] = useGetUserIdLazyQuery({
    onCompleted: (data) => {
      if (!data?.login?.id) {
        renderAlert('User with the supplied e-mail does not exist', 'error');
        setLoggingIn(false);
      } else {
        dispatch(
          loginUser({
            userId: data?.login?.id,
            userType: data.login.isMentor ? 'mentor' : 'mentee',
          }),
        );
        router.push({
          pathname: data.login.isMentor ? 'mentor' : 'mentee',
          query: { userId: data?.login?.id ?? '' },
        });
      }
    },
    onError: () => {
      setLoggingIn(false);
      renderAlert('Unknown network error.  Please try again later', 'error');
    },
  });

  return (
    <LoginStyle>
      <h1>Enter your e-mail to login</h1>
      <div className="inputs">
        {loggingIn ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              id="standard-basic"
              label="Email"
              variant="outlined"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              color="success"
              variant="contained"
              className="login-button"
              onClick={() => {
                setLoggingIn(true);
                getUser({
                  variables: {
                    input: email,
                  },
                });
              }}
            >
              Login
            </Button>
          </>
        )}
      </div>
    </LoginStyle>
  );
};

export default Login;

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;
  .inputs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    .email {
      width: 300px;
    }
  }
`;
