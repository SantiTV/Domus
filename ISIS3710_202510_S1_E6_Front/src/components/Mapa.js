import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

const Mapa = ({ ancho, altura, ubicaciones }) => {
  const [positions, setPositions] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null); 

  useEffect(() => {
    if (!ubicaciones || ubicaciones.length === 0) return;

    const geocodeAddresses = async () => {
      const geocoder = new window.google.maps.Geocoder();
      const results = [];

      for (const item of ubicaciones) {
        await new Promise((resolve) => {
          geocoder.geocode({ address: item.direccion }, (res, status) => {
            if (status === "OK" && res[0]) {
              const loc = res[0].geometry.location;
              results.push({
                lat: loc.lat(),
                lng: loc.lng(),
                usuario: item.usuario || "",
                descripcion: item.descripcion || "",
              });
            } else {
              console.error("Geocoding failed for:", item.direccion, status);
            }
            resolve();
          });
        });
      }

      setPositions(results);
    };

    if (window.google && window.google.maps) {
      geocodeAddresses();
    }
  }, [ubicaciones]);

  const defaultCenter = positions[0] || { lat: 4.60971, lng: -74.08175 };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div style={{ width: ancho, height: altura }}>
        <Map
          mapId={process.env.REACT_APP_MAP_ID}
          gestureHandling="greedy"
          disableDefaultUI={true}
          zoomControl={true}
          defaultCenter={defaultCenter}
          center={defaultCenter}
          defaultZoom={12}
        >
          {positions.map((pos, idx) => (
            <AdvancedMarker
              key={idx}
              position={{ lat: pos.lat, lng: pos.lng }}
              onClick={() => setSelectedMarker(pos)}
            >
              <Pin background="blue" borderColor="navy" glyphColor="white" />
            </AdvancedMarker>
          ))}

          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ maxWidth: "200px", padding: "4px" }}>
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  {selectedMarker.usuario || "Ubicación"}
                </p>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#333" }}>
                  {selectedMarker.descripcion || "Sin descripción"}
                </p>
              </div>
            </InfoWindow>

          )}
        </Map>
      </div>
    </APIProvider>
  );
};

Mapa.propTypes = {
  ancho: PropTypes.string.isRequired,
  altura: PropTypes.string.isRequired,
  ubicaciones: PropTypes.arrayOf(
    PropTypes.shape({
      direccion: PropTypes.string.isRequired,
      usuario: PropTypes.string,
      descripcion: PropTypes.string,
    })
  ),
};

export default Mapa;
