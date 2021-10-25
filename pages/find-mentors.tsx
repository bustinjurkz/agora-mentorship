import React, { useState } from 'react';
import styled from 'styled-components';
import { MentorWithScore, useGetUserMentorsQuery } from 'generated/graphql';
import Loading from 'components/Loading';
import { SearchInputs } from 'components/SearchInputs';
import MentorCard from 'components/MentorCard';
import RequestMentor from 'components/RequestMentor';
import ErrorMessage from 'components/ErrorMessage';
import { applySearchQuery } from 'components/utils';
import { useRouter } from 'next/dist/client/router';

const FindMentors: React.FC = () => {
  const router = useRouter();
  const [mentorSearch, setMentorSearch] = useState('');
  console.log('yeet: ', router.query.userId);
  const { data, loading, error } = useGetUserMentorsQuery({
    variables: {
      input: router.query.userId as string,
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
    return (
      <ErrorMessage msg={'Unknown network error.  Please try again later'} />
    );
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
