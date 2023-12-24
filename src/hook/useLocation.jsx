import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { useRecoilState } from 'recoil';
import { LOCATION_DATA } from '../recoil/recoil';

const useLocation = (apiKey) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [LocationData , setLocationData] = useRecoilState(LOCATION_DATA)

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setLocation({ latitude, longitude, accuracy });
        setLocationData({ latitude, longitude, accuracy });


        // Make a request to the Google Maps Geocoding API
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.results.length > 0) {
            // Extract the formatted address from the API response
            const formattedAddress = data.results[0].formatted_address;
            setAddress(formattedAddress);
          } else {
            setAddress('Address not found');
          }
        } catch (error) {
          console.error('Error fetching address:', error);
          setError('Error fetching address');
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setError('Error getting location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, address, error };
};

export default useLocation;
