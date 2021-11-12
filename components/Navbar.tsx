/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import Button from '@mui/material/Button';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from 'redux/userSlice';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const loggedInUser = useSelector(selectLoggedInUser);
  const router = useRouter();
  const returnHome = () => {
    router.push(`/`, `/`);
  };
  const homeNavRoutes = new Set(['/', '/register']);

  return homeNavRoutes.has(router.pathname) ? (
    <Paper elevation={4}>
      <LandingNavbarStyle>
        <Image
          src="/logo-header.png"
          alt={'Agora Mentoring'}
          width="225"
          height="69"
          aria-label={'Agora Mentoring'}
          className="logo"
          onClick={() => returnHome()}
          onKeyDown={() => returnHome()}
        />

        <div className="nav-buttons">
          <Button className="item">How it Works</Button>
          <Button className="item">About</Button>
          <Button className="item">Contact</Button>
          <Button
            size={'large'}
            onClick={() => router.push(`/register`, `/register`)}
            className="sign-up"
          >
            Register
          </Button>
        </div>
      </LandingNavbarStyle>
    </Paper>
  ) : (
    <Paper elevation={4}>
      <AdminNavbarStyle>
        <Image
          src="/logo-header.png"
          alt={'Agora Mentoring'}
          width="225"
          height="69"
          aria-label={'Agora Mentoring'}
          className="logo"
          onClick={() => returnHome()}
          onKeyDown={() => returnHome()}
        />
        <div className="nav-buttons">
          {(loggedInUser.userType === 'mentee' ||
            router.pathname === '/mentee') && (
            <Button
              className="item"
              startIcon={<SearchIcon fontSize="large" />}
              onClick={() =>
                router.push({
                  pathname: 'find-mentors',
                  query: {
                    userId: router.query.userId as string,
                  },
                })
              }
            >
              Find Mentors
            </Button>
          )}

          <IconButton className="item">
            <NotificationsIcon fontSize="large" />
          </IconButton>
          <IconButton className="item">
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </div>
      </AdminNavbarStyle>
    </Paper>
  );
};

export default Navbar;

const LandingNavbarStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0px 50px;
  background-color: ${({ theme }) => theme.mainGreen};
  .image-wrapper {
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

const AdminNavbarStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0px 50px;
  background-color: ${({ theme }) => theme.mainGreen};
  .image-wrapper {
    cursor: pointer;
  }
  .nav-buttons {
    display: inline-flex;
    align-items: center;

    .item {
      margin: 0px 17px;
      color: ${({ theme }) => theme.white};
    }
  }
`;
