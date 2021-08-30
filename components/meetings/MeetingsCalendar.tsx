import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import { BackgroundStyle } from '../utils';

const MeetingsCalendar: React.FC = () => {
  const [value, onChange] = useState(new Date());
  return (
    <MeetingsCalendarStyle>
      <BackgroundStyle>
        <Calendar onChange={onChange} value={value} />
      </BackgroundStyle>
    </MeetingsCalendarStyle>
  );
};

export default MeetingsCalendar;

const MeetingsCalendarStyle = styled.div`
  display: flex;
  .react-calendar {
    background: #fff;
    width: 350px;
    max-width: 100%;
    background: white;
    border: none;
    line-height: 1.125em;
    font-family: 'Rubik', sans-serif;
  }
  .react-calendar__navigation__label {
    font-family: 'Rubik', sans-serif;
    font-size: large;
    color: ${({ theme }) => theme.mainGreen};
    font-weight: 600;
  }
  .react-calendar__tile {
    font-family: 'Rubik', sans-serif;
  }

  .react-calendar__month-view__weekdays {
    text-transform: none;
    color: ${({ theme }) => theme.TDGreen};
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${({ theme }) => theme.lightGrey};
    font-size: large;
  }
  .react-calendar__month-view__days__day {
    font-size: large;
  }

  abbr {
    text-decoration: none;
  }
  .react-calendar__tile--active {
    background: ${({ theme }) => theme.mainGreen};
    color: white;
    border-radius: 40px;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: ${({ theme }) => theme.TDGreen};
  }

  .react-calendar__tile--now {
    background: #ffff76;
    border-radius: 40px;
  }

  .react-calendar__tile--now {
    background: lightgray;
    border-radius: 40px;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #e6e6e6;
    border-radius: 40px;
  }

  .react-calendar__navigation__arrow,
  .react-calendar__navigation__prev-button {
    font-family: 'Rubik', sans-serif;
    font-size: large;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    border-radius: 40px;
  }
  .react-calendar__tile:disabled {
    border-radius: 40px;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    border-radius: 40px;
  }
`;
