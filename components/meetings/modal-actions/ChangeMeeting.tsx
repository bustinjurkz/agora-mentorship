import Button from '@mui/material/Button';
import { Meeting, useCancelMeetingMutation } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useDispatch } from 'react-redux';
import { removeMeeting } from 'redux/meetingSlice';
import { renderAlert } from 'components/utils';

export interface ChangeMeetingProps {
  setAction: (x: undefined) => void;
  meeting: Meeting;
}
export enum CancelReason {
  Conflict = 'Schedule Conflict',
  Other = 'Other',
}

export const ChangeMeeting: React.FC<ChangeMeetingProps> = ({
  setAction,
  meeting,
}) => {
  const dispatch = useDispatch();

  const [reason, setReason] = useState<CancelReason>();
  const [cancelMeeting] = useCancelMeetingMutation({
    variables: {
      input: {
        id: meeting.id.toString(),
        cancel_reason: meeting.cancel_reason ?? '',
      },
    },
  });
  const handleCancel = () => {
    setLoading(true);
    cancelMeeting()
      .catch(() =>
        renderAlert(
          'Failed to cancel meeting.  Please contact support.',
          'error',
        ),
      )
      .finally(() => {
        setLoading(false);
        renderAlert('Maybe another time?', 'success', 'Meeting cancelled');
        dispatch(removeMeeting(meeting.id));
        setAction(undefined);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason((event.target as HTMLInputElement).value as CancelReason);
  };
  const [loading, setLoading] = useState(false);
  const reasons = [
    { value: CancelReason.Conflict, label: 'Schedule Conflict' },
    { value: CancelReason.Other, label: 'Other' },
  ];
  return (
    <ChangeMeetingStyle>
      <h1 className="header">Cancel Meeting</h1>

      <div className="reason-question">
        <h3>Select a reason for cancelling</h3>
        <h4 className="select-one">(Select one)</h4>
      </div>
      <FormControl className="select-reason" component="fieldset">
        <RadioGroup
          aria-label="service"
          name="services"
          value={reason}
          onChange={handleChange}
        >
          {reasons.map((x, key: number) => {
            return (
              <FormControlLabel
                value={x.value}
                control={<Radio />}
                label={x.label}
                key={key}
              />
            );
          })}
        </RadioGroup>
      </FormControl>

      <div className="buttons">
        <Button
          variant="contained"
          className="cancel-button"
          color="secondary"
          onClick={() => setAction(undefined)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          className="confirm-button"
          disabled={!reason}
          style={{ background: !reason ? '#979797' : '#008a00' }}
          onClick={() => handleCancel()}
        >
          {loading ? <CircularProgress /> : 'Decline'}
        </Button>
      </div>
    </ChangeMeetingStyle>
  );
};

const ChangeMeetingStyle = styled.div`
  margin-top: 0px;
  .cancel-button {
    margin-right: 30px;
    background: #c56c6c;
  }
`;
