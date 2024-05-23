import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import polyline from 'polyline';
import axios from 'axios';
import PropTypes from 'prop-types';
import L from 'leaflet';

// Custom icon for markers
const customIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const FlightMap = ({ sourceIcao, destinationIcao, apiKey, apiUrl }) => {
  const [route, setRoute] = useState([]);
  const [sourceCoord, setSourceCoord] = useState(null);
  const [destinationCoord, setDestinationCoord] = useState(null);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            fromICAO: sourceIcao,
            toICAO: destinationIcao,
            key: apiKey
          },
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const encodedPolyline = response.data[1].encodedPolyline;
        const decodedPolyline = polyline.decode(encodedPolyline);
        setRoute(decodedPolyline);

        if (decodedPolyline.length > 0) {
          setSourceCoord([decodedPolyline[0][0], decodedPolyline[0][1]]);
          setDestinationCoord([decodedPolyline[decodedPolyline.length - 1][0], decodedPolyline[decodedPolyline.length - 1][1]]);
          decodedPolyline.forEach(async (coord, index) => {
            const weather = await fetchWeatherData(coord[0], coord[1]);
            setWeatherData(prev => ({ ...prev, [index]: weather }));
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoute();
  }, [sourceIcao, destinationIcao, apiKey, apiUrl]);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          temperature_unit: 'celsius',
          windspeed_unit: 'kmh'
        }
      });
      return response.data.current_weather;
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      return {};
    }
  };

  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {route.length > 0 && (
        <>
          <Polyline positions={route} pathOptions={{ color: 'blue', dashArray: '10, 10' }} />
          {sourceCoord && (
            <Marker position={sourceCoord} icon={customIcon}>
              <Popup>Departure: {sourceIcao} <br /> Latitude: {sourceCoord[0]} <br /> Longitude: {sourceCoord[1]}</Popup>
            </Marker>
          )}
          {destinationCoord && (
            <Marker position={destinationCoord} icon={customIcon}>
              <Popup>Destination: {destinationIcao} <br /> Latitude: {destinationCoord[0]} <br /> Longitude: {destinationCoord[1]}</Popup>
            </Marker>
          )}
          {route.map((position, index) => (
            <CircleMarker key={index} center={position} radius={5} color="red" fillColor="red" fillOpacity={0.5}>
              <Tooltip>
                Waypoint {index + 1} <br />
                Latitude: {position[0]} <br />
                Longitude: {position[1]} <br />
                {weatherData[index] ? (
                  <>
                    Temperature: {weatherData[index].temperature}°C <br />
                    Humidity: {weatherData[index].relative_humidity}% <br />
                    Wind Speed: {weatherData[index].windspeed} km/h <br />
                    Precipitation: {weatherData[index].precipitation} mm
                  </>
                ) : (
                  'Loading weather data...'
                )}
              </Tooltip>
            </CircleMarker>
          ))}
        </>
      )}
    </MapContainer>
  );
};

FlightMap.propTypes = {
  sourceIcao: PropTypes.string.isRequired,
  destinationIcao: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  apiUrl: PropTypes.string.isRequired
};

export default FlightMap;
