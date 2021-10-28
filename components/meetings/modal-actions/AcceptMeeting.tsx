import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {
  Meeting,
  Proposed_Time,
  useCreateMeetingMutation,
} from 'generated/graphql';
import ListItem from '@mui/material/ListItem';
import format from 'date-fns/format';
import React, { useState } from 'react';
import styled from 'styled-components';
import { renderAlert, servicePrettier } from '../../utils';
import CircularProgress from '@mui/material/CircularProgress';

export interface AcceptMeetingProps {
  meeting: Meeting;
  setAction: (x: undefined) => void;
  mentorName: string;
  mentorEmail: string;
  refetch: () => void;
}

export const AcceptMeeting: React.FC<AcceptMeetingProps> = ({
  meeting,
  setAction,
  mentorName,
  mentorEmail,
  refetch,
}) => {
  const proposedTimes = meeting.proposed_times as Proposed_Time[];
  const [selectedTime, setSelectedTime] = useState(-1);

  const [createMeeting] = useCreateMeetingMutation({
    variables: {
      input: {
        id: meeting.id.toString(),
        start_time: proposedTimes[selectedTime]?.time,
        topic: meeting.topic!,
        mentorEmail: mentorEmail,
        mentorName: mentorName,
        menteeName: meeting.mentee?.name!,
        menteeUserId: meeting.mentee?.userId!,
      },
    },
  });

  const handleBooking = () => {
    setLoading(true);
    createMeeting()
      .then((res) => {
        if (res.data?.createMeeting === true) {
          setLoading(false);
          setAction(undefined);
          renderAlert(
            `Meeting with ${meeting.mentee
              ?.name!} booked, you will both receive an e-mail with the Google Meets room link shortly.`,
            'success',
          );
          refetch();
        } else {
          setLoading(false);
          setAction(undefined);

          renderAlert(
            'Failed to create meeting.  Please contact support.',
            'error',
          );
        }
      })
      .catch(() => {
        setAction(undefined);
        setLoading(false);
        renderAlert(
          'Failed to create meeting.  Please contact support.',
          'error',
        );
      });
  };
  const [loading, setLoading] = useState(false);

  return (
    <AcceptMeetingStyle>
      <h1 className="header">Confirm Meeting</h1>
      <div className="info-row">
        <div className="item">
          <span className="label">Name: </span>
          <span className="value">{meeting.mentee?.name}</span>
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
              onClick={() => setSelectedTime(i)}
              style={{
                background: selectedTime === i ? '#e8e8e8' : undefined,
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
          disabled={selectedTime === -1}
          style={{ background: selectedTime === -1 ? '#979797' : '#008a00' }}
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
