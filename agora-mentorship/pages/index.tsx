import { useGetMentorsQuery } from 'generated/graphql';

const Home = () => {
  const { data, loading } = useGetMentorsQuery();

  if (loading) {
    console.log('yeet');
  }
  console.log('data: ', data?.Mentor);

  return (
    <>
      <div>NAME OF THE MAN AVEC PLAN: {data?.Mentor?.name}</div>
    </>
  );
};

export default Home;
