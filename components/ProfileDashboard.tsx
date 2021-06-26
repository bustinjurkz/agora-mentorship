import Button from '@material-ui/core/Button/Button';
import React from 'react';
import styled from 'styled-components';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MailIcon from '@material-ui/icons/Mail';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import Divider from '@material-ui/core/Divider';
import { BackgroundStyle } from './helperFunctions';

const ProfileDashboard: React.FC = () => {
  return (
    <BackgroundStyle>
      <ProfileDashboardStyle>
        <h3>Profile</h3>
        <Button className="item" startIcon={<DashboardIcon className="icon" />}>
          Dashboard
        </Button>
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
  height: 100%;
  justify-content: space-between;
  align-items: start;

  .divider {
    width: 100%;
  }
  .icon {
    color: ${({ theme }) => theme.mainGreen};
  }
`;
