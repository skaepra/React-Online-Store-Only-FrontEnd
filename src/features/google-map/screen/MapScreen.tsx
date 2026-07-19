// @ts-ignore

import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import axios from "axios";

import * as Location from "expo-location";
import * as MapLibreGL from "@maplibre/maplibre-react-native";

const { MapView, Camera, PointAnnotation, ShapeSource, LineLayer } = MapLibreGL;

/*
========================================
PRODUCTION DELIVERY MAP
========================================

FEATURES:
- Live user location
- Driver marker
- REAL ROAD ROUTE
- Smooth camera
- 60 FPS
- OpenRouteService integration
- MapTiler maps

========================================
*/

const MAPTILER_KEY = "YefZtd9Oy6PoFkzReWv6";

const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQ3YWM5M2UxOGE5YjRjZjFiMTgxODU5ODQ1YzNjMDFkIiwiaCI6Im11cm11cjY0In0=";

export default function MapScreen() {
  const cameraRef = useRef<any>(null);

  /*
  ========================================
  ROLE DISTANCE
  ========================================
  */
  const [distance, setDistance] = useState(0);

  /*
  ========================================
  ROLE TIME
  ========================================
  */
  const [duration, setDuration] = useState(0);

  /*
  ========================================
  USER LOCATION
  ========================================
  */
  const [userLocation, setUserLocation] = useState({
    latitude: 33.5138,
    longitude: 36.2765,
  });

  /*
  ========================================
  DRIVER LOCATION
  ========================================
  */
  const [driverLocation] = useState({
    latitude: 33.519,
    longitude: 36.29,
  });

  /*
  ========================================
  REAL ROUTE
  ========================================
  */
  const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);

  /*
  ========================================
  GET LOCATION ON START
  ========================================
  */
  useEffect(() => {
    getCurrentLocation();
  }, []);

  /*
  ========================================
  GET USER LOCATION
  ========================================
  */
  async function getCurrentLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      /*
      ========================================
      UPDATE USER LOCATION
      ========================================
      */
      setUserLocation(coords);

      /*
      ========================================
      MOVE CAMERA
      ========================================
      */
      cameraRef.current?.setCamera({
        centerCoordinate: [coords.longitude, coords.latitude],
        zoomLevel: 14,
        animationDuration: 2000,
      });

      /*
      ========================================
      GET REAL ROUTE
      ========================================
      */
      getRoute(coords);
    } catch (error) {
      console.log("Location Error:", error);
    }
  }

  /*
  ========================================
  GET REAL ROAD ROUTE
  ========================================
  */
  async function getRoute(userCoords: { latitude: number; longitude: number }) {
    try {
      const response = await axios.get(
        "https://api.openrouteservice.org/v2/directions/driving-car",
        {
          params: {
            api_key: ORS_API_KEY,

            start: `${userCoords.longitude},${userCoords.latitude}`,

            end: `${driverLocation.longitude},${driverLocation.latitude}`,
          },
        },
      );

      /*
      ========================================
      EXTRACT ROAD COORDINATES
      ========================================
      */
      const coordinates = response.data.features[0].geometry.coordinates;

      const summary = response.data.features[0].properties.summary;

      setDistance(summary.distance);

      setDuration(summary.duration);

      /*
      ========================================
      CREATE ROUTE GEOJSON
      ========================================
      */
      setRouteGeoJSON({
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates,
        },
        properties: {},
      });
    } catch (error) {
      console.log("Route Error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`}
        compassEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
      >
        {/* CAMERA */}
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: [userLocation.longitude, userLocation.latitude],
            zoomLevel: 13,
          }}
        />

        {/* USER MARKER */}
        <PointAnnotation
          id="user-location"
          coordinate={[userLocation.longitude, userLocation.latitude]}
        >
          <View style={styles.userMarker} />
        </PointAnnotation>

        {/* DRIVER MARKER */}
        <PointAnnotation
          id="driver-location"
          coordinate={[driverLocation.longitude, driverLocation.latitude]}
        >
          <View style={styles.driverMarker} />
        </PointAnnotation>

        {/* REAL ROUTE */}
        {routeGeoJSON && (
          <ShapeSource id="route-source" shape={routeGeoJSON}>
            <LineLayer
              id="route-line"
              style={{
                lineWidth: 5,
                lineColor: "#2563eb",
                lineCap: "round",
                lineJoin: "round",
              }}
            />
          </ShapeSource>
        )}
      </MapView>
      <Text>
  Distance: {(distance / 1000).toFixed(1)} km
</Text>

<Text>
  ETA: {(duration / 60).toFixed(0)} min
</Text>
    </View>
  );
}

/*
========================================
STYLES
========================================
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  /*
  ========================================
  USER MARKER
  ========================================
  */
  userMarker: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#2563eb",
    borderWidth: 3,
    borderColor: "#ffffff",
  },

  /*
  ========================================
  DRIVER MARKER
  ========================================
  */
  driverMarker: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#22c55e",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
});
