import Button from '@material-ui/core/Button/Button';
import React from 'react';
import styled from 'styled-components';
import { BackgroundStyle } from '../utils';
import { PastConnectionsCard } from './PastConnectionCard';

const sampleData = [
  {
    rating: 3,
    mentee: 'Steven Du',
    jobtitle: 'Co-Op',
    position: 'Enterprise Analyst',
    company: 'TD Bank',
  },
  {
    rating: 4,
    mentee: 'Jessie Bharaj',
    jobtitle: 'Co-Op',
    position: 'Advanced Analytics',
    company: 'TD Bank',
  },
];

const PastConnections: React.FC = () => {
  return (
    <BackgroundStyle style={{ marginTop: 20 }}>
      <PastConnectionsStyle>
        <div className="header">
          <h3 className="header-text">Past Connections</h3>
          <Button size={'small'} className="view-all-button">
            View All
          </Button>
        </div>
        <div className="cards-container">
          {sampleData.map((x: any, i: number) => (
            <PastConnectionsCard key={i} sampleData={x} />
          ))}
        </div>
      </PastConnectionsStyle>
    </BackgroundStyle>
  );
};

export default PastConnections;

const PastConnectionsStyle = styled.div`
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

  .cards-container {
    display: inline-flex;
  }
`;
