import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

import { Mentee, Proposed_Time, Services } from 'generated/graphql';

import React from 'react';
import styled from 'styled-components';
import { AcceptMeeting } from './modal-actions/AcceptMeeting';
import { ChangeMeeting } from './modal-actions/ChangeMeeting';
import { StatusMeeting } from './modal-actions/StatusMeeting';

export interface MeetingActionModalProps {
  finish: boolean;
  setFinish: (x: boolean) => void;
  setAction: (x: undefined) => void;
  topic: Services;
  times: Proposed_Time[];
  mentee?: Mentee;
  action: 'accept' | 'change' | 'status';
}

const MeetingActionModal: React.FC<MeetingActionModalProps> = ({
  topic,
  times,
  mentee,
  action,
  setAction,
}) => {
  console.log('times: ', times);

  // const [createMeeting] = useCreateMeetingMutation({
  //   variables: {
  //     input: {
  //       topic: topic,
  //       menteeId: '4',
  //       mentorId: mentor.mentor!.mentor!.id,
  //       proposed_times: times,
  //     },
  //   },
  // });
  // const handleBooking = () => {
  //   setLoading(true);
  //   createMeeting()
  //     .catch(() => alert('Failed to create meeting.  Please contact support.'))
  //     .finally(() => setLoading(false));
  // };
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
              topic={topic}
              times={times}
              mentee={mentee}
              setAction={setAction}
            />
          )}
          {action === 'change' && (
            <ChangeMeeting
              topic={topic}
              times={times}
              mentee={mentee}
              setAction={setAction}
            />
          )}
          {action === 'status' && (
            <StatusMeeting
              topic={topic}
              times={times}
              mentee={mentee}
              setAction={setAction}
            />
          )}
        </DialogContent>
      </MeetingActionModalStyle>
    </Dialog>
  );
};

export default MeetingActionModal;

export const MeetingActionModalStyle = styled.div`
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
