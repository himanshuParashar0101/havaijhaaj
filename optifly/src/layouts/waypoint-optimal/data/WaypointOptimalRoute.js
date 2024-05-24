import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import RoomIcon from '@mui/icons-material/Room';
import { SvgIcon } from '@mui/material';
import { red } from '@mui/material/colors';


// Default icon fix for leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
});

const myCustomColour = '#ff0000'

const markerHtmlStyles = `
  background-color: ${myCustomColour};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  left: -1.5rem;
  top: -1.5rem;
  position: relative;
  border-radius: 3rem 3rem 0;
  transform: rotate(45deg);
  border: 1px solid #FFFFFF`

const icon = L.divIcon({
  className: "my-custom-pin",
  iconAnchor: [0, 24],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<span style="${markerHtmlStyles}" />`
})

// Custom red icon for false waypoints
const iconPerson = L.Icon.extend({
  options: {
    iconUrl: require('./redicon.png'),
    iconRetinaUrl: require('./redicon.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
  }
});

const RedDotIcon = new L.DivIcon({
  html: <SvgIcon component={RoomIcon} style={{ color: red[500] }} />,
  className: '',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

const WeatherMap = ({ sourceIata, destinationIata, pointC, pointD }) => {
  const [routeData, setRouteData] = useState(null);
  const [polylinePositions, setPolylinePositions] = useState([]);
  const [falseWaypoints, setFalseWaypoints] = useState([]);

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

        const response = await fetch('http://localhost:8082/airbus6/calculateOptimumRoute', requestOptions);
        const data = await response.json();
        setRouteData(data);
        updatePolylinePositions(data.waypoint);
      } catch (error) {
        console.error('Error fetching route data:', error);
      }
    };

    fetchRouteData();
  }, [sourceIata, destinationIata, pointC, pointD]);

  const updatePolylinePositions = (waypoints) => {
    const trueWaypoints = waypoints.filter(wp => wp.flag);
    const sortedTrueWaypoints = trueWaypoints.sort((a, b) => {
      if (a.lat === b.lat) {
        return a.lon - b.lon;
      }
      return a.lat - b.lat;
    });

    const falseWaypoints = waypoints.filter(wp => !wp.flag);

    setPolylinePositions(
      sortedTrueWaypoints.map(wp => [wp.lat, wp.lon, wp.wayPointName])
    );

    setFalseWaypoints(
      falseWaypoints.map(wp => [wp.lat, wp.lon, wp.wayPointName])
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
        <Marker key={`true-${index}`} position={position}>
          <Popup>{position[2]}</Popup>
        </Marker>
      ))}
      {falseWaypoints.map((position, index) => (
        <Marker key={`false-${index}`} position={position} icon={icon} >
          <Popup>{position[2]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

WeatherMap.propTypes = {
  sourceIata: PropTypes.string.isRequired,
  destinationIata: PropTypes.string.isRequired,
  pointC: PropTypes.string,
  pointD: PropTypes.string
};

export default WeatherMap;
