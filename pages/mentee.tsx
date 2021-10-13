import PersonalInfo from 'components/PersonalInfo';
import React from 'react';
import Loading from 'components/Loading';
// import ProfileDashboard from 'components/ProfileDashboard';
import MeetingsCalendar from 'components/meetings/MeetingsCalendar';
import UpcomingMeetings from 'components/meetings/UpcomingMeetings';
import PendingMeetings from 'components/meetings/PendingMeetings';
import PastConnections from 'components/meetings/PastConnections';
import { AdminStyle } from './mentor';
import ErrorMessage from 'components/ErrorMessage';
import { Majors, Meeting, Mentee, useGetUserQuery } from 'generated/graphql';
import { useDispatch } from 'react-redux';
import { addMeetings } from 'redux/store';
import { NotificationBanner } from 'components/NotificationBanner';

const MenteeAdmin: React.FC = () => {
  const dispatch = useDispatch();
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
  dispatch(addMeetings(data?.user?.mentee?.meetings as Meeting[]));

  return (
    <AdminStyle>
      {/* <ProfileDashboard userType="mentee" /> */}
      <div className="profile-container">
        <NotificationBanner userName={data?.user?.mentee?.name as string} />

        <div className="info-cal-container">
          <PersonalInfo
            user={data?.user?.mentee! as Mentee}
            userType="mentee"
            schoolName={data?.user?.university![0]?.name as string}
            majors={data?.user?.majors as Majors[]}
          />
          <MeetingsCalendar />
        </div>
        <UpcomingMeetings userType="mentee" />
        <PendingMeetings userType="mentee" />
        <PastConnections userType="mentee" />
      </div>
    </AdminStyle>
  );
};

export default MenteeAdmin;
