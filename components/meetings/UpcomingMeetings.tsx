import Button from '@material-ui/core/Button/Button';
import { Meeting } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle, UserType } from '../utils';
import { UpcomingMeetingCard } from './UpcomingMeetingCard';

export interface UpcomingMeetingsProps {
  meetings: Meeting[];
  userType: UserType;
}

const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({
  meetings,
  userType,
}) => {
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
          {meetings.length > 0 ? (
            meetings.map((x, i: number) => (
              <UpcomingMeetingCard
                key={i}
                meeting={x}
                otherUser={userType === UserType.mentee ? x.mentor! : x.mentee!}
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
