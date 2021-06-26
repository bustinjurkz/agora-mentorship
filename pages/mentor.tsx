import PersonalInfo from 'components/PersonalInfo';
import React from 'react';
import styled from 'styled-components';
import { useGetMentorsQuery } from 'generated/graphql';
import Loading from 'components/Loading';
import ProfileDashboard from 'components/ProfileDashboard';
import { BackgroundStyle } from 'components/helperFunctions';
import MeetingsCalendar from 'components/MeetingsCalendar';

// import { useRouter } from 'next/router';

const MentorAdmin: React.FC = () => {
  // const router = useRouter();
  const { data, loading } = useGetMentorsQuery();
  if (loading) {
    return <Loading />;
  }
  const renderNotificationBanner = () => {
    return (
      <div className="notification-banner">
        <BackgroundStyle backgroundColor="#ffaf40">
          Hi {data?.Mentor?.name}, you have 1 upcoming & 3 pending meetings!
        </BackgroundStyle>
      </div>
    );
  };
  return (
    <MentorAdminStyle>
      <ProfileDashboard />
      <div className="mentor-container">
        {renderNotificationBanner()}
        <div className="info-cal-container">
          <PersonalInfo mentorInfo={data?.Mentor!} />
          <MeetingsCalendar />
        </div>
      </div>
    </MentorAdminStyle>
  );
};

export default MentorAdmin;

const MentorAdminStyle = styled.div`
  display: flex;
  flex-direction: row;
  .mentor-container {
    display: flex;
    flex-direction: column;
    .info-cal-container {
      display: inline-flex;
    }
  }

  .notification-banner {
    color: white;
  }
`;
