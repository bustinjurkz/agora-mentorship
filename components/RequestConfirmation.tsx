import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import {
  MentorWithScore,
  Services,
  useProposeMeetingMutation,
} from 'generated/graphql';
import ListItem from '@mui/material/ListItem';
import { format } from 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';
import { renderAlert, servicePrettier } from './utils';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/dist/client/router';

export interface RequestConfirmationProps {
  finish: boolean;
  setFinish: (x: boolean) => void;
  topic: Services;
  times: Date[];
  mentor: MentorWithScore;
}

const RequestConfirmation: React.FC<RequestConfirmationProps> = ({
  finish,
  setFinish,
  topic,
  times,
  mentor,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [proposeMeeting] = useProposeMeetingMutation({
    variables: {
      input: {
        topic: topic,
        menteeId: router.query.userId as string,
        mentorId: mentor.mentor!.mentor!.id,
        proposed_times: times,
      },
    },
  });
  const handleBooking = () => {
    setLoading(true);
    proposeMeeting()
      .catch(() =>
        renderAlert(
          'Failed to create meeting.  Please contact support.',
          'error',
        ),
      )
      .finally(() => {
        setLoading(false);
        renderAlert(
          `${mentor.mentor?.mentor?.name} has received your request`,
          'success',
        );
        setFinish(false);
        router.back();
      });
  };
  return (
    <Dialog
      open={finish}
      onClose={() => setFinish(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <RequestConfirmationStyle>
        <DialogContent>
          <h1 className="header">Confirm Booking</h1>
          <div className="info-row">
            <div className="item">
              <span className="label">Mentor: </span>
              <span className="topic">{mentor.mentor?.mentor?.name}</span>
            </div>

            <div className="item">
              <span className="label">Topic: </span>
              <span className="topic">{servicePrettier(topic)}</span>
            </div>
          </div>

          <div className="item">
            <span className="label">Times: </span>
            <List className="times">
              {times.map((time: Date, i: number) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={format(time, "h:mm aaaaa'm'")}
                    secondary={format(time, `PPPP`)}
                  />
                </ListItem>
              ))}
            </List>
          </div>

          <div className="buttons">
            <Button
              variant="contained"
              className="change-button"
              onClick={() => setFinish(false)}
            >
              Change
            </Button>
            <Button
              variant="contained"
              className="confirm-button"
              onClick={() => handleBooking()}
            >
              {loading ? <CircularProgress /> : 'Book'}
            </Button>
          </div>
        </DialogContent>
      </RequestConfirmationStyle>
    </Dialog>
  );
};

export default RequestConfirmation;

export const RequestConfirmationStyle = styled.div`
  width: 600px;
  color: ${(props) => props.theme.mainGreen};
  font-size: larger;
  margin-bottom: 30px;

  .times {
    .MuiListItemText-primary {
      font-size: larger;
    }
    .MuiListItemText-secondary {
      font-size: large;
    }
  }
  .header {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
  }
  .buttons {
    margin-top: 30px;
    display: flex;
    place-content: center;
    .confirm-button,
    .change-button {
      width: 175px;
      height: 60px;
      align-self: center;
      color: white;
      font-size: larger;
    }
    .confirm-button {
      background: ${(props) => props.theme.TDGreen};
    }
    .change-button {
      background: #979797;
      margin-right: 30px;
    }
  }
  .info-row {
  }
  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;

    .label {
      font-size: large;
      margin-right: 20px;
      width: 100px;
    }
  }
`;
