import Button from '@material-ui/core/Button/Button';
import { Meeting } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle, UserType } from '../utils';
import { PendingMeetingCard } from './PendingMeetingCard';

export interface PendingMeetingsProps {
  meetings: Meeting[];
  userType: UserType;
  mentorName?: string;
  mentorEmail?: string;
}

const PendingMeetings: React.FC<PendingMeetingsProps> = ({
  meetings,
  userType,
  mentorName,
  mentorEmail,
}) => {
  return (
    <BackgroundStyle style={{ marginTop: 20 }}>
      <PendingMeetingsStyle>
        <div className="header">
          <h3 className="header-text">Pending Meetings</h3>
          <Button size={'small'} className="view-all-button">
            View All
          </Button>
        </div>

        <div className="card-container">
          {meetings.length > 0 ? (
            meetings?.map((x, i: number) => (
              <PendingMeetingCard
                key={i}
                meeting={x}
                userType={userType}
                otherUser={userType === UserType.mentee ? x.mentor! : x.mentee!}
                mentorEmail={mentorEmail}
                mentorName={mentorName}
              />
            ))
          ) : (
            <div className="none">You currently have no pending meetings</div>
          )}
        </div>
      </PendingMeetingsStyle>
    </BackgroundStyle>
  );
};

export default PendingMeetings;

const PendingMeetingsStyle = styled.div`
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
