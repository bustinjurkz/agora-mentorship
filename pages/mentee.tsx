import PersonalInfo from 'components/PersonalInfo';
import React from 'react';
import Loading from 'components/Loading';
import ProfileDashboard from 'components/ProfileDashboard';
import { BackgroundStyle } from 'components/helperFunctions';
import MeetingsCalendar from 'components/meetings/MeetingsCalendar';
import UpcomingMeetings from 'components/meetings/UpcomingMeetings';
import PendingMeetings from 'components/meetings/PendingMeetings';
import PastConnections from 'components/meetings/PastConnections';
import { AdminStyle } from './mentor';
import ErrorMessage from 'components/ErrorMessage';
import { useGetUserQuery } from 'generated/graphql';

// import { useRouter } from 'next/router';

const MenteeAdmin: React.FC = () => {
  // const router = useRouter();
  //TODO make dynamic, not 50
  const { data, loading, error } = useGetUserQuery({
    variables: {
      input: '50',
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage msg="Unknown network error.  Please try again later" />
    );
  }
  const renderNotificationBanner = () => {
    return (
      <BackgroundStyle backgroundColor="#ff9500">
        <div className="notification-banner">
          Hi {data?.user?.mentee?.name}, you have 1 upcoming & 3 pending
          meetings!
        </div>
      </BackgroundStyle>
    );
  };
  return (
    <AdminStyle>
      <ProfileDashboard menteeInfo={data?.user?.mentee!} />
      <div className="profile-container">
        {renderNotificationBanner()}
        <div className="info-cal-container">
          <PersonalInfo menteeInfo={data?.user?.mentee!} />
          <MeetingsCalendar />
        </div>
        <UpcomingMeetings />
        <PendingMeetings />
        <PastConnections />
      </div>
    </AdminStyle>
  );
};

export default MenteeAdmin;
