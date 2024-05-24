import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Default icon fix for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const WeatherMap = ({ sourceIata, destinationIata, pointC, pointD }) => {
  const [routeData, setRouteData] = useState(null);
  const [polylinePositions, setPolylinePositions] = useState([]);

  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const requestBody = {
          source: sourceIata,
          destination: destinationIata,
          pointC: pointC,
          pointD: pointD
        };

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        };

        const response = await fetch('http://localhost:8082/airbus6/calculateWeatherOptimumRoute', requestOptions);
        const data = await response.json();

        if (data.shortestWaypointDistance === "Infinity") {
          alert('Due to bad weather condition, the flight has been delayed');
        } else {
          setRouteData(data);
          updatePolylinePositions(data.waypoint);
        }
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };

    fetchRouteData();
  }, [sourceIata, destinationIata, pointC, pointD]);

  const updatePolylinePositions = (waypoints) => {
    const trueWaypoints = waypoints.filter(wp => wp.flag);
    const sortedWaypoints = trueWaypoints.sort((a, b) => {
      if (a.lat === b.lat) {
        return a.lon - b.lon;
      }
      return a.lat - b.lat;
    });

    setPolylinePositions(
      sortedWaypoints.map(wp => [wp.lat, wp.lon, wp.wayPointName])
    );
  };

  if (!routeData) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={polylinePositions.length > 0 ? polylinePositions[0] : [0, 0]} zoom={6} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {polylinePositions.length > 0 && (
        <Polyline positions={polylinePositions} color="blue" />
      )}
      {polylinePositions.map((position, index) => (
        <Marker key={index} position={position}>
          <Popup>{position[2]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

WeatherMap.propTypes = {
  sourceIata: PropTypes.string.isRequired,
  destinationIata: PropTypes.string.isRequired,
  pointC: PropTypes.object.isRequired,
  pointD: PropTypes.object.isRequired,
};

export default WeatherMap;
