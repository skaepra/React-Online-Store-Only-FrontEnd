// @ts-ignore
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";

import axios from "axios";
import * as Location from "expo-location";
import * as MapLibreGL from "@maplibre/maplibre-react-native";

const { MapView, Camera } = MapLibreGL;

// مفاتيح الـ API (تأكد من تعريفها في مشروعك)
const MAPTILER_KEY = "YefZtd9Oy6PoFkzReWv6";
const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQ3YWM5M2UxOGE5YjRjZjFiMTgxODU5ODQ1YzNjMDFkIiwiaCI6Im11cm11cjY0In0=";

type LocationType = {
  latitude: number;
  longitude: number;
};

type Props = {
  isPermissionDenied: boolean; // استلام الـ prop من الأعلى
  onConfirm?: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
};
// إحداثيات افتراضية في حال رفض المستخدم الإذن (مثال: دمشق، سوريا أو غيرها حسب تطبيقك)
const DEFAULT_COORDS = [36.2765, 33.5138]; 

export default function LocationPickerMaps({ onConfirm, isPermissionDenied }: Props) {
  const cameraRef = useRef<any>(null);

  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

/*
  ========================================
  GET USER LOCATION (تُستدعى فقط عند الضغط على زر ◎)
  ========================================
  */
  async function getCurrentLocation() {
    try {
      setLoading(true);
      
      // 🟢 هنا نقوم بفحص الإذن الحالي فقط دون إظهار نافذة منبثقة للمستخدم
      const { status } = await Location.getForegroundPermissionsAsync();

      // إذا كان المستخدم قد رفض الإذن مسبقاً في صفحة الـ Home وضغط على زر ◎
      if (status !== "granted") {
        Alert.alert(
          "تنبيه",
          "ميزة تحديد الموقع التلقائي معطلة لأنك رفضت إذن الوصول للموقع. يمكنك تفعيله من إعدادات الهاتف، أو استمر في تحديد موقعك يدوياً بسحب الخريطة."
        );
        return;
      }

      // إذا كان الإذن مقبولاً (مثلاً لو وافق عليه مسبقاً) يجلب الموقع فوراً
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedLocation(coords);

      cameraRef.current?.setCamera({
        centerCoordinate: [coords.longitude, coords.latitude],
        zoomLevel: 15,
        animationDuration: 1500,
      });

      reverseGeocode(coords.latitude, coords.longitude);
    } catch (error) {
      console.log("Location Error:", error);
    } finally {
      setLoading(false);
    }
  }

  /*
  ========================================
  REVERSE GEOCODE
  ========================================
  */
  async function reverseGeocode(latitude: number, longitude: number) {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.openrouteservice.org/geocode/reverse",
        {
          params: {
            api_key: ORS_API_KEY,
            "point.lat": latitude,
            "point.lon": longitude,
            "accept-language": "ar",
          },
        }
      );

      const label = response.data.features?.[0]?.properties?.label || "عنوان غير معروف";
      setAddress(label);
    } catch (error) {
      console.log("Reverse Geocode Error:", error);
    } finally {
      setLoading(false);
    }
  }

  /*
  ========================================
  CONFIRM LOCATION
  ========================================
  */
  function handleConfirmLocation() {
    if (!selectedLocation) {
      Alert.alert("تنبيه", "الرجاء تحديد موقع على الخريطة أولاً.");
      return;
    }

    onConfirm?.({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      address,
    });
  }

  return (
    <View style={styles.container}>
      {/* MAP */}
      <MapView
        style={styles.map}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`}
        compassEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        onRegionDidChange={(event) => {
          const geometry = event.geometry;
          if (!geometry?.coordinates) return;

          const coords = geometry.coordinates;
          const newLocation = {
            longitude: coords[0],
            latitude: coords[1],
          };

          setSelectedLocation(newLocation);
          reverseGeocode(newLocation.latitude, newLocation.longitude);
        }}
      >
        {/* CAMERA */}
        <Camera
          ref={cameraRef}
          defaultSettings={{
            centerCoordinate: DEFAULT_COORDS,
            zoomLevel: 13,
          }}
        />
      </MapView>

      {/* CENTER MARKER */}
      <View pointerEvents="none" style={styles.markerContainer}>
        <View style={styles.markerOuter}>
          <View style={styles.markerInner} />
        </View>
      </View>

      {/* ADDRESS CARD */}
      <View style={styles.bottomCard}>
        <Text style={styles.title}>
          {isPermissionDenied ? "حدد موقعق يدويا" : "اختر موقع التوصيل"}
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#000" />
            <Text style={styles.loadingText}>جاري تحديد العنوان...</Text>
          </View>
        ) : (
          <Text style={styles.addressText}>
            {address || "قم بتحريك الخريطة لتحديد الموقع"}
          </Text>
        )}

        {/* CONFIRM BUTTON */}
        <Pressable
          style={[styles.confirmButton, loading && styles.disabledButton]}
          onPress={handleConfirmLocation}
          disabled={loading}
        >
          <Text style={styles.confirmButtonText}>تأكيد الموقع</Text>
        </Pressable>
      </View>

      {/* CURRENT LOCATION BUTTON */}
      <Pressable
        style={[
          styles.currentLocationButton, 
          isPermissionDenied && { opacity: 0.6 } // جعل الزر شبه شفاف لتوضيح أن الميزة مقيدة
        ]}
        onPress={getCurrentLocation}
      >
        <Text style={styles.currentLocationText}>◎</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  markerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -15,
    marginTop: -15,
    justifyContent: "center",
    alignItems: "center",
  },
  markerOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 122, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  markerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#007AFF",
  },
  bottomCard: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "right", marginBottom: 10 },
  loadingContainer: { flexDirection: "row-reverse", alignItems: "center", justifyContent: "center", marginVertical: 10 },
  loadingText: { marginRight: 10, fontSize: 14, color: "#666" },
  addressText: { fontSize: 14, color: "#444", textAlign: "right", marginVertical: 10 },
  confirmButton: { backgroundColor: "#007AFF", padding: 12, borderRadius: 10, alignItems: "center", marginTop: 10 },
  disabledButton: { backgroundColor: "#A2C9FF" },
  confirmButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  currentLocationButton: {
    position: "absolute",
    bottom: 220,
    right: 20,
    backgroundColor: "#FFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  currentLocationText: { fontSize: 24, color: "#007AFF" },
});