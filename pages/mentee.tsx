import PersonalInfo from 'components/PersonalInfo';
import React from 'react';
import Loading from 'components/Loading';
import ProfileDashboard from 'components/ProfileDashboard';
import { BackgroundStyle, UserType } from 'components/utils';
import MeetingsCalendar from 'components/meetings/MeetingsCalendar';
import UpcomingMeetings from 'components/meetings/UpcomingMeetings';
import PendingMeetings from 'components/meetings/PendingMeetings';
import PastConnections from 'components/meetings/PastConnections';
import { AdminStyle } from './mentor';
import ErrorMessage from 'components/ErrorMessage';
import { useGetUserQuery } from 'generated/graphql';

const MenteeAdmin: React.FC = () => {
  const { data, loading, error } = useGetUserQuery({
    variables: {
      input: '15',
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error || !data) {
    return (
      <ErrorMessage msg="Unknown network error.  Please try again later" />
    );
  }

  const upcomingMeetings = data?.user?.mentee?.meetings?.filter(
    (x) => x?.start_time && !x.end_time,
  );
  const pendingMeetings = data?.user?.mentee?.meetings?.filter(
    (x) => !x?.start_time && x?.proposed_times,
  );
  const pastMeetings = data?.user?.mentee?.meetings?.filter(
    (x) => !x?.start_time && x?.end_time,
  );

  const renderNotificationBanner = () => {
    return (
      <BackgroundStyle backgroundColor="#ff9500">
        <div className="notification-banner">
          Hi {data?.user?.mentee?.name}, you have{' '}
          {upcomingMeetings && upcomingMeetings?.length > 0
            ? upcomingMeetings?.length
            : 'no'}{' '}
          upcoming &{' '}
          {pendingMeetings && pendingMeetings.length > 0
            ? pendingMeetings.length
            : 'no'}{' '}
          pending meetings!
        </div>
      </BackgroundStyle>
    );
  };
  return (
    <AdminStyle>
      <ProfileDashboard userType={UserType.mentee} />
      <div className="profile-container">
        {renderNotificationBanner()}
        <div className="info-cal-container">
          <PersonalInfo
            user={data?.user?.mentee!}
            userType={UserType.mentee}
            schoolName={data?.user?.university[0]!.name!}
            majors={data?.user?.majors}
          />
          <MeetingsCalendar />
        </div>
        <UpcomingMeetings
          meetings={upcomingMeetings}
          userType={UserType.mentee}
        />
        <PendingMeetings
          meetings={pendingMeetings}
          userType={UserType.mentee}
        />
        <PastConnections meetings={pastMeetings} userType={UserType.mentee} />
      </div>
    </AdminStyle>
  );
};

export default MenteeAdmin;
