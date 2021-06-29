import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const Loading: React.FC = () => {
  return (
    <LoadingStyle>
      <CircularProgress color="primary" />
    </LoadingStyle>
  );
};

export default Loading;

const LoadingStyle = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  place-items: center;
  justify-content: center;
`;
