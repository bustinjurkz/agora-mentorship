import Button from '@material-ui/core/Button/Button';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle, UserType } from '../utils';
import { UpcomingMeetingCard } from './UpcomingMeetingCard';
import { useSelector } from 'react-redux';
import { selectUpcomingMeetings } from 'redux/store';
export interface UpcomingMeetingsProps {
  userType: UserType;
}

const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({ userType }) => {
  const upcomingMeetings = useSelector(selectUpcomingMeetings);
  return (
    <BackgroundStyle>
      <UpcomingMeetingsStyle>
        <div className="header">
          <h3 className="header-text">Upcoming Meetings</h3>
          <Button size={'small'} className="view-all-button">
            View All
          </Button>
        </div>
        <div className="card-container">
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((x, i: number) => (
              <UpcomingMeetingCard
                key={i}
                meeting={x}
                otherUser={userType === 'mentee' ? x.mentor! : x.mentee!}
              />
            ))
          ) : (
            <div className="none">You currently have no pending meetings</div>
          )}
        </div>
      </UpcomingMeetingsStyle>
    </BackgroundStyle>
  );
};

export default UpcomingMeetings;

const UpcomingMeetingsStyle = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  .header {
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .view-all-button {
      color: lightgray;
    }
  }

  .card-container {
    display: inline-flex;
  }
`;
