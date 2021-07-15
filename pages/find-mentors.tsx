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

  return (
    <FindMentorsStyle>
      <SearchInputs />
    </FindMentorsStyle>
  );
};

export default FindMentors;

export const FindMentorsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 45px;
`;
