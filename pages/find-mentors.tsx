import React, { useState } from 'react';
import styled from 'styled-components';
import { Mentor, useGetMentorsQuery } from 'generated/graphql';
import Loading from 'components/Loading';

import { SearchInputs } from 'components/SearchInputs';
import MentorCard from 'components/MentorCard';
import RequestMentor from 'components/RequestMentor';

const FindMentors: React.FC = () => {
  const { data, loading } = useGetMentorsQuery();
  const [mentorRequested, setMentorRequested] = useState<Mentor>();
  const back = () => {
    setMentorRequested(undefined);
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <FindMentorsStyle>
      {mentorRequested ? (
        <RequestMentor mentor={mentorRequested} back={back} />
      ) : (
        <>
          <SearchInputs />
          <h1>Mentors</h1>
          {data?.Mentors?.map((x, i: number) => (
            <MentorCard
              key={i}
              mentor={x!}
              setMentorRequested={setMentorRequested}
            />
          ))}
        </>
      )}
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
