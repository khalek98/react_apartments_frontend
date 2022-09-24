import Header from './components/Header';
import MainPage from './pages/MainPage';

import './App.scss';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAuthUser } from './redux/Slices/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  return (
    <>
      <Header />
      <MainPage />
    </>
  );
}

export default App;
