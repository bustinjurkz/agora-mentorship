import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { Meeting, Mentee } from 'generated/graphql';

import React from 'react';
import styled from 'styled-components';
import { AcceptMeeting } from './modal-actions/AcceptMeeting';
import { ChangeMeeting } from './modal-actions/ChangeMeeting';

export interface MeetingActionModalProps {
  finish: boolean;
  setFinish: (x: boolean) => void;
  setAction: (x: undefined) => void;
  meeting: Meeting;
  mentee?: Mentee;
  action: 'accept' | 'change' | 'status';
  mentorEmail?: string;
  mentorName?: string;
  refetch?: () => void;
}

export const MeetingActionModal: React.FC<MeetingActionModalProps> = ({
  meeting,
  action,
  setAction,
  mentorEmail,
  mentorName,
  refetch,
}) => {
  return (
    <Dialog
      open={action !== undefined}
      onClose={() => setAction(undefined)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <MeetingActionModalStyle>
        <DialogContent>
          {action === 'accept' && (
            <AcceptMeeting
              meeting={meeting}
              setAction={setAction}
              mentorEmail={mentorEmail!}
              mentorName={mentorName!}
              refetch={refetch!}
            />
          )}
          {action === 'change' && (
            <ChangeMeeting meeting={meeting} setAction={setAction} />
          )}
        </DialogContent>
      </MeetingActionModalStyle>
    </Dialog>
  );
};

const MeetingActionModalStyle = styled.div`
  width: 600px;
  color: ${(props) => props.theme.mainGreen};
  font-size: larger;
  margin-bottom: 30px;

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
    .change-button,
    .cancel-button {
      width: 175px;
      height: 60px;
      align-self: center;
      color: white;
      font-size: larger;
      :hover {
        filter: brightness(90%);
      }
    }
  }
`;
