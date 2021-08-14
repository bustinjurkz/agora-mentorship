import PersonalInfo from 'components/PersonalInfo';
import React from 'react';
import styled from 'styled-components';
// import { useGetMentorQuery } from 'generated/graphql';
import Loading from 'components/Loading';
import ProfileDashboard from 'components/ProfileDashboard';
import { BackgroundStyle } from 'components/helperFunctions';
import MeetingsCalendar from 'components/meetings/MeetingsCalendar';
import UpcomingMeetings from 'components/meetings/UpcomingMeetings';
import PendingMeetings from 'components/meetings/PendingMeetings';
import PastConnections from 'components/meetings/PastConnections';
import ErrorMessage from 'components/ErrorMessage';

const MentorAdmin: React.FC = () => {
  //@ts-ignore
  const { data, loading, error } = useGetMentorQuery();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage msg={'Unknown network error.  Please try again later'} />
    );
  }
  const renderNotificationBanner = () => {
    return (
      <BackgroundStyle backgroundColor="#ff9500">
        <div className="notification-banner">
          Hi {data?.Mentor?.name}, you have 1 upcoming & 3 pending meetings!
        </div>
      </BackgroundStyle>
    );
  };
  return (
    <AdminStyle>
      <ProfileDashboard />
      <div className="profile-container">
        {renderNotificationBanner()}
        <div className="info-cal-container">
          <PersonalInfo mentorInfo={data?.Mentor!} />
          <MeetingsCalendar />
        </div>
        <UpcomingMeetings />
        <PendingMeetings />
        <PastConnections />
      </div>
    </AdminStyle>
  );
};

export default MentorAdmin;

export const AdminStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 45px;
  .profile-container {
    display: flex;
    width: 100%;
    max-width: 875px;
    flex-direction: column;
    .info-cal-container {
      display: inline-flex;
      justify-content: space-between;
      margin: 20px 0px;
    }
  }

  .notification-banner {
    color: white;
    align-self: center;
    height: 100%;
    font-size: large;
    padding: 8px;
  }
`;
