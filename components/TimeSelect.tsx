import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import { Mentor } from 'generated/graphql';
import React, { useState } from 'react';
import styled from 'styled-components';
import { format, getHours, isEqual } from 'date-fns';
import { parseDate } from './utils';
import TextField from '@mui/material/TextField';
export interface TimeSelectProps {
  handleSetTime: (time: Date) => void;
  mentor: Mentor;
  times: Date[];
}

export interface TimeButton {
  display: Date;
  available: boolean;
}
const TimeSelect: React.FC<TimeSelectProps> = ({
  handleSetTime,
  mentor,
  times,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const mentorAvailability = mentor!.availability?.map((x) =>
    new Date(x?.time).getUTCHours(),
  );

  console.log('mentorAvailability: ', mentorAvailability);

  // Appends prior meeting times in local timezone for comparison
  const mentorMeetings: Date[] | undefined = mentor!.meetings?.map(
    (x) => new Date(x?.start_time),
  );

  const viableTime = (time: Date, compareTimes: Date[]) => {
    return compareTimes?.some((x) => isEqual(time, x));
  };

  const renderTime = (timeslot: 'MORNING' | 'AFTERNOON' | 'EVENING') => {
    const morning = [
      parseDate(selectedDate!, 7),
      parseDate(selectedDate!, 8),
      parseDate(selectedDate!, 9),
      parseDate(selectedDate!, 10),
      parseDate(selectedDate!, 11),
    ];
    const afternoon = [
      parseDate(selectedDate!, 12),
      parseDate(selectedDate!, 13),
      parseDate(selectedDate!, 14),
      parseDate(selectedDate!, 15),
      parseDate(selectedDate!, 16),
    ];
    const evening = [
      parseDate(selectedDate!, 17),
      parseDate(selectedDate!, 18),
      parseDate(selectedDate!, 19),
      parseDate(selectedDate!, 20),
      parseDate(selectedDate!, 21),
    ];

    const renderButton = (time: Date, i: number) => {
      const hour = getHours(time);
      return (
        <Button
          key={i}
          className="container"
          disabled={
            (mentorAvailability && !mentorAvailability.includes(hour)) ||
            (mentorMeetings && viableTime(time, mentorMeetings))
          }
          onClick={() => handleSetTime(time)}
          style={{
            background: viableTime(time, times) ? '#1a5336' : undefined,
            color: viableTime(time, times) ? 'white' : undefined,
            border:
              (mentorAvailability && !mentorAvailability.includes(hour)) ||
              viableTime(time, mentorMeetings!)
                ? undefined
                : '2px solid #008a00',
          }}
        >
          {format(time, "h:mm aaaaa'm'")}
        </Button>
      );
    };
    switch (timeslot) {
      case 'MORNING':
        return morning.map((morningTime, i: number) =>
          renderButton(morningTime, i),
        );
      case 'AFTERNOON':
        return afternoon.map((afternoonTime, i: number) =>
          renderButton(afternoonTime, i),
        );
      case 'EVENING':
        return evening.map((eveningTime, i: number) =>
          renderButton(eveningTime, i),
        );
    }
  };

  return (
    <TimeSelectStyle>
      <div className="header">
        <h2>Please choose 3 or more suitable timeslots:</h2>
        <DatePicker
          value={selectedDate}
          renderInput={(props) => <TextField {...props} />}
          disablePast
          onChange={(selectedDate) => setSelectedDate(selectedDate)}
          minDate={new Date()}
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
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    place-items: center;
  }
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
      margin: 10px 0px;
      padding: 8px 60px;
      font-size: larger;
      font-weight: 600;
    }
  }
  margin-bottom: 50px;
`;
