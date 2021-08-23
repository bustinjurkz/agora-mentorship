import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from '@material-ui/pickers/DatePicker';
import React, { useState } from 'react';
import styled from 'styled-components';

export interface TimeSelectProps {
  handleSetTime: (time: string) => void;
  times: string[];
}
const TimeSelect: React.FC<TimeSelectProps> = ({ handleSetTime, times }) => {
  const renderTime = (timeslot: 'MORNING' | 'AFTERNOON' | 'EVENING') => {
    const morning = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
    const afternoon = ['12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
    const evening = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'];
    const renderButton = (t: string, i: number) => {
      return (
        <Button
          key={i}
          className="container"
          onClick={() => handleSetTime(t)}
          value={t}
          style={{
            background: times.some((timeAdded) => timeAdded === t)
              ? '#1a5336'
              : '',
            color: times.some((timeAdded) => timeAdded === t) ? 'white' : '',
          }}
        >
          {t}
        </Button>
      );
    };
    switch (timeslot) {
      case 'MORNING':
        return morning.map((m, i: number) => renderButton(m, i));
      case 'AFTERNOON':
        return afternoon.map((a, i: number) => renderButton(a, i));
      case 'EVENING':
        return evening.map((e, i: number) => renderButton(e, i));
    }
  };

  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <TimeSelectStyle>
      <div className="header">
        <h2>Please choose 3 or more suitable timeslots:</h2>
        <KeyboardDatePicker
          value={date}
          autoOk
          placeholder="10/10/2018"
          onChange={(date) => setDate(date as unknown as Date)}
          minDate={new Date()}
          variant="inline"
        />
      </div>
      <div className="times">
        <div className="morning">
          <h4 className="label">MORNING</h4>
          {renderTime('MORNING')}
        </div>
        <div className="afternoon">
          <h4 className="label">AFTERNOON</h4>
          {renderTime('AFTERNOON')}
        </div>
        <div className="evening">
          <h4 className="label">EVENING</h4>
          {renderTime('EVENING')}
        </div>
      </div>
    </TimeSelectStyle>
  );
};

export default TimeSelect;

const TimeSelectStyle = styled.div`
  .times {
    display: flex;
    justify-content: space-around;
    .label {
      align-self: center;
    }
    .morning,
    .afternoon,
    .evening {
      display: flex;
      flex-direction: column;
    }
    .container {
      border: 2px solid #008a00;
      margin: 10px 0px;
      padding: 8px 60px;
      font-size: larger;
      font-weight: 600;
    }
  }
  margin-bottom: 50px;
`;
