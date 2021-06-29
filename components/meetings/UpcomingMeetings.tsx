import Button from '@material-ui/core/Button/Button';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle } from '../helperFunctions';
import { UpcomingMeetingCard } from './UpcomingMeetingCard';

const sampleData = [
  {
    date: 'Tomorrow, June 17',
    type: 'Work-Life Balance',
    time: '5:00 PM - 6:00 PM EST',
    mentee: 'John Doe',
    jobtitle: 'Co-Op',
    position: 'Personal Banking',
    company: 'TD Bank',
  },
  {
    date: 'June 23 2021',
    type: 'Mock Interview',
    time: '2:00 PM - 3:00 PM EST',
    mentee: 'Janet Dee',
    jobtitle: 'Co-Op',
    position: 'Personal Banking',
    company: 'TD Bank',
  },
];

const UpcomingMeetings: React.FC = () => {
  return (
    <BackgroundStyle>
      <UpcomingMeetingsStyle>
        <div className="header">
          <h3 className="header-text">Upcoming Meetings</h3>
          <Button size={'small'} className="view-all-button">
            View All
          </Button>
        </div>
        <div className="card-container">
          {sampleData.map((x: any, i: number) => (
            <UpcomingMeetingCard key={i} sampleData={x} />
          ))}
        </div>
      </UpcomingMeetingsStyle>
    </BackgroundStyle>
  );
};

export default UpcomingMeetings;

const UpcomingMeetingsStyle = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  .header {
    display: inline-flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .view-all-button {
      color: lightgray;
    }
  }

  .card-container {
    display: inline-flex;
  }
`;
