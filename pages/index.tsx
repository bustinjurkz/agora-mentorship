import LandingPage from 'components/LandingPage';
import { useGetMentorsQuery } from 'generated/graphql';
import React from 'react';

const Home = () => {
  const { data, loading } = useGetMentorsQuery();
  if (!loading) {
    console.log(data);
  }
  return <LandingPage />;
};

export default Home;
