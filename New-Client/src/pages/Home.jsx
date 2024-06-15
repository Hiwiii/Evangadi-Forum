import { useContext } from 'react';
import { AppState } from '../App';

const Home = () => {
  const {user} = useContext(AppState);

  return (
    <>
      <h1>Home</h1>
      <br />
      <br />
      <br />
      <h2>{user.username}</h2>
    </>
  );
}

export default Home