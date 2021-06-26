import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';

const MeetingsCalendar: React.FC = () => {
  const [value, onChange] = useState(new Date());
  return (
    <MeetingsCalendarStyle>
      <Calendar onChange={onChange} value={value} />
    </MeetingsCalendarStyle>
  );
};

export default MeetingsCalendar;

const MeetingsCalendarStyle = styled.div`
  display: flex;
`;
