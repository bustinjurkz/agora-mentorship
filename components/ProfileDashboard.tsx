import Button from '@mui/material/Button';
import React from 'react';
import styled from 'styled-components';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import Divider from '@mui/material/Divider';
import { BackgroundStyle, UserType } from './utils';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useRouter } from 'next/dist/client/router';
export interface ProfileDashboardProps {
  userType: UserType;
}
const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ userType }) => {
  const router = useRouter();

  return (
    <BackgroundStyle>
      <ProfileDashboardStyle>
        <h3>Profile</h3>
        <Button className="item" startIcon={<DashboardIcon className="icon" />}>
          Dashboard
        </Button>
        {userType === 'mentee' && (
          <Button
            className="item"
            onClick={() => router.push(`/find-mentors`, `/find-mentors`)}
            startIcon={<PersonAddIcon className="icon" />}
          >
            Find Mentors
          </Button>
        )}
        <Button className="item" startIcon={<MailIcon className="icon" />}>
          Messages
        </Button>
        <Button className="item" startIcon={<HelpIcon className="icon" />}>
          Resources
        </Button>
        <Divider className="divider" />
        <Button className="item" startIcon={<SettingsIcon className="icon" />}>
          Account
        </Button>
      </ProfileDashboardStyle>
    </BackgroundStyle>
  );
};

export default ProfileDashboard;

const ProfileDashboardStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 150px;
  height: 100%;
  max-height: 400px;

  .divider {
    width: 100%;
  }
  .icon {
    color: ${({ theme }) => theme.mainGreen};
  }
  .item {
    font-weight: 600;
  }
`;
