import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';
import { useLoadScript } from '@react-google-maps/api';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAparts,
  setActiveList,
  setActivePoint,
} from '../../redux/Slices/apartSlice.js';

import styles from './Map.module.scss';
import houseImg from '../../assets/icons/house.svg';

const center = {
  lat: 50.446506,
  lng: 30.534732,
};

const Marker = ({ children }) => children;

const Map = ({ onSetTopApartWrap }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAparts());
  }, []);

  const libraries = useMemo(() => ['places'], []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { items: aparts, activePoint } = useSelector((state) => state.apart);
  const [zoom, setZoom] = useState(12);
  const [bounds, setBounds] = useState('');
  const mapRef = useRef(null);

  const points = aparts.map((apart) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      apartId: apart.id,
      title: apart.title,
      price: apart.price,
      description: apart.description,
      imgArr: apart.imgArr,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        parseFloat(apart.location.longitude),
        parseFloat(apart.location.latitude),
      ],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 200,
      maxZoom: 17,
    },
  });

  const onSetActiveList = (arr = clusters) => {
    onSetTopApartWrap();
    let newArr = [];
    arr.forEach((cluster) => {
      const { cluster: isCluster } = cluster.properties;

      if (isCluster) {
        const pointsArr = supercluster.getLeaves(
          cluster.id,
          cluster.properties.pointCount,
          0,
        );
        newArr = [...newArr, ...pointsArr];
      } else {
        newArr.push(cluster);
      }
    });
    dispatch(setActiveList(newArr));
  };

  useEffect(() => {
    onSetActiveList();
  }, [clusters]);

  const renderMarkers = useCallback(
    (arr = clusters) => {
      return arr.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              lat={latitude}
              lng={longitude}
            >
              <div
                className={`${styles.cluster_marker} ${
                  activePoint && activePoint.id === cluster.id
                    ? styles.active
                    : ''
                }`}
                style={{
                  width: `${25 + (pointCount / points.length) * 30}px`,
                  height: `${25 + (pointCount / points.length) * 30}px`,
                }}
                onClick={() => {
                  dispatch(setActivePoint(cluster));
                  onSetActiveList(
                    supercluster.getLeaves(
                      cluster.id,
                      cluster.properties.pointCount,
                      0,
                    ),
                  );
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={cluster.properties.apartId}
            lat={latitude}
            lng={longitude}
          >
            <div
              className={`${styles.cluster_img} ${
                activePoint &&
                activePoint.properties.apartId === cluster.properties.apartId
                  ? styles.cluster_img_active
                  : ''
              } `}
              onClick={() => {
                dispatch(setActivePoint(cluster));
                dispatch(setActiveList([cluster]));
              }}
            >
              <img src={houseImg} alt="house" />
            </div>
          </Marker>
        );
      });
    },
    [clusters, activePoint],
  );

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  return (
    <div className={styles.map}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
        }}
        defaultCenter={center}
        defaultZoom={12}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {renderMarkers()}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
