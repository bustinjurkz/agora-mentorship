import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Services } from 'generated/graphql';
import React from 'react';
import styled from 'styled-components';
import { servicePrettier } from './utils';

export interface RequestConfirmationProps {
  finish: boolean;
  setFinish: (x: boolean) => void;
  topic: Services;
  times: string[];
}

const RequestConfirmation: React.FC<RequestConfirmationProps> = ({
  finish,
  setFinish,
  topic,
  times,
}) => {
  return (
    <Dialog
      open={finish}
      onClose={() => setFinish(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <RequestConfirmationStyle>
        <DialogContent>
          <h1>You've Selected:</h1>
          <div className="item">
            <span className="label">Topic: </span>
            <span className="topic">{servicePrettier(topic)}</span>
          </div>

          <div className="item">
            <span className="label">Date: </span>
            <div className="date">Thursday June 17 2021</div>
          </div>

          <div className="times">
            <div className="item">
              <span className="label">Times: </span>
              <div className="times">
                {times.map(
                  (time: string, i: number) =>
                    time && (
                      <div className="time" key={i}>
                        {time}
                      </div>
                    ),
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </RequestConfirmationStyle>
      <DialogActions className="Buttons">
        <ButtonGroup
          disableElevation
          color="primary"
          aria-label="text primary button group"
          size="large"
        >
          <Button
            variant="contained"
            className="confirm-buton"
            onClick={() => setFinish(false)}
          >
            Confirm
          </Button>
          <Button onClick={() => setFinish(false)}>Change</Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default RequestConfirmation;

export const RequestConfirmationStyle = styled.div`
  width: 600px;
  color: ${(props) => props.theme.mainGreen};
  font-size: larger;
  margin-bottom: 30px;

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
    .times {
      display: inline-flex;
      .time {
        margin-right: 20px;
      }
    }
  }
`;
