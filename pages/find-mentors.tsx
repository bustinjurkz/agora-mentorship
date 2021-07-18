import React from 'react';
import styled from 'styled-components';
import { useGetMentorsQuery } from 'generated/graphql';
import Loading from 'components/Loading';

import { SearchInputs } from 'components/SearchInputs';
import MentorCard from 'components/MentorCard';

const FindMentors: React.FC = () => {
  const { data, loading } = useGetMentorsQuery();
  if (loading) {
    return <Loading />;
  }

  return (
    <FindMentorsStyle>
      <SearchInputs />
      <h1>Mentors</h1>
      {data?.Mentors?.map((x, i: number) => (
        <MentorCard key={i} mentor={x!} />
      ))}
    </FindMentorsStyle>
  );
};

export default FindMentors;

export const FindMentorsStyle = styled.div`
  width: 100%;
  align-self: center;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 100px;
`;
