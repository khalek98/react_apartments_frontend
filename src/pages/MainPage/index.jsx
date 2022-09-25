import Map from '../../components/Map';
import { useSelector } from 'react-redux';
import ApartBlock from '../../components/ApartBlock';
import backButton from '../../assets/icons/back-button.svg';
import fullscreenButton from '../../assets/icons/fullscreen.svg';
import { useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SkeletonItem from '../../components/ApartBlock/SkeletonItem';

const MainPage = () => {
  const { activeList, status } = useSelector((state) => state.apart);
  const [fullscreen, setFullscreen] = useState(false);

  const apartWrap = useRef(null);
  const onSetTopApartWrap = () => {
    apartWrap.current.scrollTo(0, 0);
  };

  return (
    <div className={`wrapper${fullscreen ? ' full_apart' : ''}`}>
      <Map onSetTopApartWrap={onSetTopApartWrap} />
      <div
        ref={apartWrap}
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
          <TransitionGroup className="apart_group">
            {activeList.map((apart) => (
              <CSSTransition
                key={`block-${apart.properties.apartId}`}
                timeout={{ enter: 300 }}
                classNames="my-apart"
              >
                <ApartBlock
                  key={`block-${apart.properties.apartId}`}
                  {...apart.properties}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        ) : (
          [...Array(2)].map((_, i) => <SkeletonItem key={i} />)
        )}
      </div>
    </div>
  );
};

export default MainPage;
