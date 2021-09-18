import Button from '@material-ui/core/Button';
import { Mentee, Proposed_Time, Services } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

export interface ChangeMeetingProps {
  finish?: boolean;
  setFinish?: (x: boolean) => void;
  setAction: (x: undefined) => void;
  topic: Services;
  times: Proposed_Time[];
  mentee?: Mentee;
}
export enum CancelReason {
  Conflict = 'Schedule Conflict',
  NoShow = 'Mentee not Committed',
  Other = 'Other',
}

export const ChangeMeeting: React.FC<ChangeMeetingProps> = ({
  topic,
  mentee,
  setAction,
}) => {
  const [reason, setReason] = useState<CancelReason>();
  const handleCancel = () => {
    console.log('ye');
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason((event.target as HTMLInputElement).value as CancelReason);
  };
  const [loading, setLoading] = useState(false);
  const reasons = [
    { value: CancelReason.Conflict, label: 'Schedule Conflict' },
    { value: CancelReason.NoShow, label: 'Mentee not Committed' },
    { value: CancelReason.Other, label: 'Other' },
  ];
  return (
    <ChangeMeetingStyle>
      <h1 className="header">Decline Meeting</h1>

      <div className="reason-question">
        <h3>Select a reason for declining {mentee?.name}?</h3>
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
