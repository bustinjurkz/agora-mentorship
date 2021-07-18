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
import { useGetMenteeQuery } from 'generated/graphql';

// import { useRouter } from 'next/router';

const MenteeAdmin: React.FC = () => {
  // const router = useRouter();
  const { data, loading } = useGetMenteeQuery();
  if (loading) {
    return <Loading />;
  }
  const renderNotificationBanner = () => {
    return (
      <BackgroundStyle backgroundColor="#ff9500">
        <div className="notification-banner">
          Hi {data?.Mentee?.name}, you have 1 upcoming & 3 pending meetings!
        </div>
      </BackgroundStyle>
    );
  };
  return (
    <AdminStyle>
      <ProfileDashboard menteeInfo={data?.Mentee!} />
      <div className="profile-container">
        {renderNotificationBanner()}
        <div className="info-cal-container">
          <PersonalInfo menteeInfo={data?.Mentee!} />
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
