import React from 'react';
import styled from 'styled-components';
import { useGetMentorsQuery } from 'generated/graphql';
import Loading from 'components/Loading';

import { SearchInputs } from 'components/SearchInputs';

const FindMentors: React.FC = () => {
  const { data, loading } = useGetMentorsQuery();
  if (loading) {
    return <Loading />;
  }

  console.log('data: ', data);

  return (
    <FindMentorsStyle>
      <SearchInputs />
      <h1>Mentors</h1>
    </FindMentorsStyle>
  );
};

export default FindMentors;

export const FindMentorsStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 45px;
`;
