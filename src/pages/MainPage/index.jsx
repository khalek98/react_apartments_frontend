import Map from '../../components/Map';
import { useSelector } from 'react-redux';
import ApartBlock from '../../components/ApartBlock';
import backButton from '../../assets/icons/back-button.svg';
import fullscreenButton from '../../assets/icons/fullscreen.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MainPage = () => {
  const { activeList, status } = useSelector((state) => state.apart);
  const [fullscreen, setFullscreen] = useState(false);

  // const getRes = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/aparts`);

  //   console.log(res.data);
  // };

  // useEffect(() => {
  //   getRes();
  // }, []);

  return (
    <div className={`wrapper${fullscreen ? ' full_apart' : ''}`}>
      <Map />
      <div
        className={`apart_wrap ${
          status === 'loading' ? 'apart_wrap_loading' : ''
        }`}
      >
        <div className="full_apart_button">
          <img
            src={fullscreen === true ? backButton : fullscreenButton}
            alt="fullscreen"
            onClick={() => setFullscreen((state) => !state)}
          />
        </div>
        {activeList.length > 0 ? (
          activeList.map((apart) => (
            <ApartBlock
              key={`block-${apart.properties.apartId}`}
              {...apart.properties}
            />
          ))
        ) : (
          <h2>У цій видимій зоні немає квартир.</h2>
        )}
      </div>
    </div>
  );
};

export default MainPage;
