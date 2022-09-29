import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/Header';
import Home from './pages/Home';
import { fetchAuthUser } from './redux/Slices/auth';

import './App.scss';
import Profile from './pages/Profile';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUser());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
