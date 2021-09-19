import PersonalInfo from 'components/PersonalInfo';
import React from 'react';
import styled from 'styled-components';
import { Majors, Meeting, Mentor, useGetUserQuery } from 'generated/graphql';
import Loading from 'components/Loading';
import ProfileDashboard from 'components/ProfileDashboard';
import { BackgroundStyle, UserType } from 'components/utils';
import MeetingsCalendar from 'components/meetings/MeetingsCalendar';
import UpcomingMeetings from 'components/meetings/UpcomingMeetings';
import PendingMeetings from 'components/meetings/PendingMeetings';
import PastConnections from 'components/meetings/PastConnections';
import ErrorMessage from 'components/ErrorMessage';

const MentorAdmin: React.FC = () => {
  const { data, loading, error } = useGetUserQuery({
    variables: {
      input: '16',
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <ErrorMessage msg={'Unknown network error.  Please try again later'} />
    );
  }

  const upcomingMeetings = data?.user?.mentor?.meetings?.filter(
    (x) => x?.start_time && !x.end_time,
  );
  const pendingMeetings = data?.user?.mentor?.meetings?.filter(
    (x) => !x?.start_time && x?.proposed_times,
  );
  const pastMeetings = data?.user?.mentor?.meetings?.filter(
    (x) => !x?.start_time && x?.end_time,
  );
  const renderNotificationBanner = () => {
    return (
      <BackgroundStyle backgroundColor="#ff9500">
        <div className="notification-banner">
          Hi {data?.user?.mentor?.name}, you have{' '}
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
      <ProfileDashboard userType={UserType.mentor} />
      <div className="profile-container">
        {renderNotificationBanner()}
        <div className="info-cal-container">
          <PersonalInfo
            user={data?.user?.mentor! as Mentor}
            userType={UserType.mentor}
            schoolName={data?.user?.university[0]?.name}
            majors={data?.user?.majors as Majors[]}
          />
          <MeetingsCalendar upcomingMeetings={upcomingMeetings as Meeting[]} />
        </div>
        <UpcomingMeetings
          meetings={upcomingMeetings as Meeting[]}
          userType={UserType.mentor}
        />
        <PendingMeetings
          meetings={pendingMeetings as Meeting[]}
          userType={UserType.mentor}
        />
        <PastConnections
          meetings={pastMeetings as Meeting[]}
          userType={UserType.mentor}
        />
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
