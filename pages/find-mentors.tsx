import React, { useState } from 'react';
import styled from 'styled-components';
import { MentorWithScore, useGetUserMentorsQuery } from 'generated/graphql';
import Loading from 'components/Loading';

import { SearchInputs } from 'components/SearchInputs';
import MentorCard from 'components/MentorCard';
import RequestMentor from 'components/RequestMentor';
import { applySearchQuery, renderError } from 'components/utils';

const FindMentors: React.FC = () => {
  const [mentorSearch, setMentorSearch] = useState('');
  const { data, loading, error } = useGetUserMentorsQuery({
    variables: {
      input: '15',
    },
  });
  const [mentorRequested, setMentorRequested] = useState<MentorWithScore>();
  const back = () => {
    setMentorRequested(undefined);
  };
  if (loading) {
    return <Loading />;
  }

  if (error) {
    renderError('Unknown network error. Please try again later.');
  }
  const mentors = data?.userMentors;
  const sortedMentors = mentors?.slice().sort((a, b) => b!.score! - a!.score!);
  const filteredMentors = applySearchQuery(sortedMentors!, mentorSearch);

  return (
    <FindMentorsStyle>
      {mentorRequested ? (
        <RequestMentor mentor={mentorRequested} back={back} />
      ) : (
        <>
          <SearchInputs setMentorSearch={setMentorSearch} />
          <h1>Mentors</h1>
          {filteredMentors?.map((x, i: number) => (
            <MentorCard
              key={i}
              mentorWithScore={x!}
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
