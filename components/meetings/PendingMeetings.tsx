import Button from '@mui/material/Button';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle, UserType } from '../utils';
import { PendingMeetingCard } from './PendingMeetingCard';
import { useSelector } from 'react-redux';
import { selectPendingMeetings } from 'redux/meetingSlice';
export interface PendingMeetingsProps {
  userType: UserType;
  mentorName?: string;
  mentorEmail?: string;
}

const PendingMeetings: React.FC<PendingMeetingsProps> = ({
  userType,
  mentorName,
  mentorEmail,
}) => {
  const pendingMeetings = useSelector(selectPendingMeetings);

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
          {pendingMeetings.length > 0 ? (
            pendingMeetings?.map((x, i: number) => (
              <PendingMeetingCard
                key={i}
                meeting={x}
                userType={userType}
                otherUser={userType === 'mentee' ? x.mentor! : x.mentee!}
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
