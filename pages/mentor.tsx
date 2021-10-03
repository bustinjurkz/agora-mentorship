import PersonalInfo from 'components/PersonalInfo';
import React from 'react';
import styled from 'styled-components';
import { Majors, Meeting, Mentor, useGetUserQuery } from 'generated/graphql';
import Loading from 'components/Loading';
import ProfileDashboard from 'components/ProfileDashboard';
import MeetingsCalendar from 'components/meetings/MeetingsCalendar';
import UpcomingMeetings from 'components/meetings/UpcomingMeetings';
import PendingMeetings from 'components/meetings/PendingMeetings';
import PastConnections from 'components/meetings/PastConnections';
import ErrorMessage from 'components/ErrorMessage';
import { useDispatch } from 'react-redux';
import { addMeetings } from 'redux/store';
import { NotificationBanner } from 'components/NotificationBanner';

const MentorAdmin: React.FC = () => {
  const dispatch = useDispatch();

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

  dispatch(addMeetings(data?.user?.mentor?.meetings as Meeting[]));

  return (
    <AdminStyle>
      <ProfileDashboard userType={'mentor'} />
      <div className="profile-container">
        <NotificationBanner userName={data?.user?.mentor?.name as string} />
        <div className="info-cal-container">
          <PersonalInfo
            user={data?.user?.mentor! as Mentor}
            userType="mentor"
            schoolName={data?.user?.university![0]?.name as string}
            majors={data?.user?.majors as Majors[]}
          />
          <MeetingsCalendar />
        </div>
        <UpcomingMeetings userType="mentor" />
        <PendingMeetings
          userType="mentor"
          mentorName={data?.user?.mentor?.name!}
          mentorEmail={data?.user?.email as string}
        />
        <PastConnections userType="mentor" />
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
