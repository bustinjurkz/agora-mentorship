import Button from '@material-ui/core/Button/Button';
import { Meeting } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle, UserType } from '../utils';
import { PastConnectionsCard } from './PastConnectionCard';

export interface PendingMeetingsProps {
  meetings: Meeting[];
  userType: UserType;
}

const PastConnections: React.FC<PendingMeetingsProps> = ({
  meetings,
  userType,
}) => {
  return (
    <BackgroundStyle style={{ marginTop: 20 }}>
      <PastConnectionsStyle>
        <div className="header">
          <h3 className="header-text">Past Connections</h3>
          <Button size={'small'} className="view-all-button">
            View All
          </Button>
        </div>
        <div className="card-container">
          {meetings.length > 0 ? (
            meetings?.map((x, i: number) => (
              <PastConnectionsCard
                key={i}
                meeting={x}
                otherUser={userType === UserType.mentee ? x.mentor! : x.mentee!}
              />
            ))
          ) : (
            <div className="none">You have not yet completed a session.</div>
          )}
        </div>
      </PastConnectionsStyle>
    </BackgroundStyle>
  );
};

export default PastConnections;

const PastConnectionsStyle = styled.div`
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

  .cards-container {
    display: inline-flex;
  }
`;
