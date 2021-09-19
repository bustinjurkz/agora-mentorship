import Button from '@material-ui/core/Button';

import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import {
  Meeting,
  Mentee,
  Proposed_Time,
  useCreateMeetingMutation,
} from 'generated/graphql';
import ListItem from '@material-ui/core/ListItem';
import format from 'date-fns/format';
import React, { useState } from 'react';
import styled from 'styled-components';
import { servicePrettier } from '../../utils';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface AcceptMeetingProps {
  meeting: Meeting;
  mentee?: Mentee;
  setAction: (x: undefined) => void;
}

export const AcceptMeeting: React.FC<AcceptMeetingProps> = ({
  meeting,
  mentee,
  setAction,
}) => {
  const proposedTimes = meeting.proposed_times as Proposed_Time[];
  const [selectedTime, setSelectedTime] = useState(0);

  const [createMeeting] = useCreateMeetingMutation({
    variables: {
      input: {
        id: meeting.id.toString(),
        start_time: meeting.start_time,
      },
    },
  });

  const handleBooking = () => {
    createMeeting()
      .catch(() => alert('Failed to create meeting.  Please contact support.'))
      .finally(() => setLoading(false));
  };
  const [loading, setLoading] = useState(false);

  return (
    <AcceptMeetingStyle>
      <h1 className="header">Confirm Meeting</h1>
      <div className="info-row">
        <div className="item">
          <span className="label">Name: </span>
          <span className="value">{mentee?.name}</span>
        </div>

        <div className="item">
          <span className="label">Topic: </span>
          <span className="value">{servicePrettier(meeting.topic!)}</span>
        </div>
      </div>

      <div className="item">
        <span className="label time">Select a time: </span>
        <List className="times">
          {proposedTimes.map((time, i: number) => (
            <Button
              key={i}
              onClick={() => setSelectedTime(time.id)}
              style={{
                background: selectedTime === time.id ? '#e8e8e8' : undefined,
              }}
            >
              <ListItem>
                <ListItemText
                  primary={format(new Date(time.time), "h:mm aaaaa'm'")}
                  secondary={format(new Date(time.time), 'PPPP')}
                />
              </ListItem>
            </Button>
          ))}
        </List>
      </div>

      <div className="buttons">
        <Button
          variant="contained"
          className="change-button"
          color="secondary"
          onClick={() => setAction(undefined)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className="confirm-button"
          disabled={selectedTime === 0}
          style={{ background: selectedTime === 0 ? '#979797' : '#008a00' }}
          onClick={() => handleBooking()}
        >
          {loading ? <CircularProgress /> : 'Confirm'}
        </Button>
      </div>
    </AcceptMeetingStyle>
  );
};

const AcceptMeetingStyle = styled.div`
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
