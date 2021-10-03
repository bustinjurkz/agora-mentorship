import Button from '@mui/material/Button';
import { Meeting, Mentee } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';

export interface StatusMeetingProps {
  setAction: (x: undefined) => void;
  mentee?: Mentee;
  meeting: Meeting;
}

export const StatusMeeting: React.FC<StatusMeetingProps> = ({
  meeting,
  mentee,
  setAction,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <StatusMeetingStyle>
      <h1 className="header">Meeting Status</h1>

      <div className="buttons">
        <Button
          variant="contained"
          className="change-button"
          color="secondary"
          onClick={() => setAction(undefined)}
        >
          Back
        </Button>
        {/* <Button
          variant="contained"
          className="confirm-button"
          disabled={selectedTime === 0}
          style={{ background: selectedTime === 0 ? '#979797' : '#008a00' }}
          onClick={() => handleBooking()}
        >
          {loading ? <CircularProgress /> : 'Confirm'}
        </Button> */}
      </div>
    </StatusMeetingStyle>
  );
};

const StatusMeetingStyle = styled.div`
  margin-top: 0px;
  .change-button {
    margin-right: 30px;
    background: #c56c6c;
  }

  .times {
    .MuiListItemText-primary {
      font-size: larger;
    }
    .MuiListItemText-secondary {
      font-size: large;
    }
  }
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;

    .label {
      font-size: large;
      margin-right: 20px;
      width: 150px;
    }
    .time {
      width: 275px;
    }
    .value {
      font-weight: 600;
    }
  }
`;
