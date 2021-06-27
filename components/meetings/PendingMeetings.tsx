import Button from '@material-ui/core/Button/Button';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle } from '../helperFunctions';
import { PendingMeetingCard } from './PendingMeetingCard';

export const sampleData = [
  {
    date: 'June 30 2021',
    type: 'Career Development',
    times: [
      '3:00 PM - 4:00 PM EST',
      '5:00 PM - 6:00 PM EST',
      '6:00 PM - 7:00 PM EST',
    ],
    mentee: 'Randy Miess',
    jobtitle: 'Co-Op',
    position: 'Enterprise Analyst',
    company: 'TD Bank',
  },
  {
    date: 'July 7 2021',
    type: 'General',
    times: [
      '9:00 AM - 10:00 AM EST',
      '11:00 AM - 12:00 PM EST',
      '6:00 PM - 7:00 PM EST',
    ],
    mentee: 'Jane Day',
    jobtitle: 'Co-Op',
    position: 'Personal Banking',
    company: 'TD Bank',
  },
];

const PendingMeetings: React.FC = () => {
  return (
    <BackgroundStyle style={{ marginTop: 20 }}>
      <PendingMeetingsStyle>
        <div className="header">
          <h3 className="header-text">Pending Meetings</h3>
          <Button size={'small'} className="view-all-button">
            View All
          </Button>
        </div>
        <div className="card-container">
          {sampleData.map((x: any, i: number) => (
            <PendingMeetingCard key={i} sampleData={x} />
          ))}
        </div>
      </PendingMeetingsStyle>
    </BackgroundStyle>
  );
};

export default PendingMeetings;

const PendingMeetingsStyle = styled.div`
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
