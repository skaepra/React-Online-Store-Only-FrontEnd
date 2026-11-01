import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import axios from "axios";

type LocationType = {
  latitude: number;
  longitude: number;
};

type Props = {
  isPermissionDenied?: boolean;
  onConfirm?: (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
};

const DEFAULT_COORDS: L.LatLngExpression = [33.5138, 36.2765];
const OSM_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export default function LocationPickerMaps({
  onConfirm,
  isPermissionDenied,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastLocationRef = useRef<LocationType | null>(null);

  const [selectedLocation, setSelectedLocation] = useState<LocationType>({
    latitude: 33.5138,
    longitude: 36.2765,
  });
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  async function reverseGeocode(latitude: number, longitude: number) {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "jsonv2",
            lat: latitude,
            lon: longitude,
            "accept-language": "ar",
          },
        },
      );

      setAddress(response.data.display_name ?? "عنوان غير معروف");
    } catch (error) {
      console.error("Reverse Geocode Error:", error);
      setAddress("تعذر الحصول على العنوان");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: DEFAULT_COORDS,
      zoom: 13,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer(OSM_TILE_URL, {
      attribution: OSM_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        map.invalidateSize();
      });
    });

    resizeObserver.observe(mapContainerRef.current);

    map.whenReady(() => {
      map.invalidateSize();
      reverseGeocode(33.5138, 36.2765);
    });

    map.on("moveend", () => {
      const center = map.getCenter();
      const newLoc = {
        latitude: center.lat,
        longitude: center.lng,
      };

      if (
        lastLocationRef.current &&
        Math.abs(lastLocationRef.current.latitude - newLoc.latitude) < 0.0001 &&
        Math.abs(lastLocationRef.current.longitude - newLoc.longitude) < 0.0001
      ) {
        return;
      }

      lastLocationRef.current = newLoc;
      setSelectedLocation(newLoc);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        reverseGeocode(newLoc.latitude, newLoc.longitude);
      }, 1000);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  function getCurrentLocation() {
    if (!navigator.geolocation) {
      alert("متصفحك لا يدعم تحديد الموقع الجغرافي.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setSelectedLocation(coords);
        lastLocationRef.current = coords;

        mapRef.current?.flyTo([coords.latitude, coords.longitude], 15, {
          duration: 1.5,
        });

        reverseGeocode(coords.latitude, coords.longitude);
      },
      (error) => {
        setLoading(false);
        console.error("Location Error:", error);
        alert(
          "تعذر تحديد موقعك الحالي. تأكد من منح إذن الوصول للموقع في المتصفح.",
        );
      },
      {
        enableHighAccuracy: true,
      },
    );
  }

  function handleConfirmLocation() {
    onConfirm?.({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      address,
    });
  }

  return (
    <div style={styles.container}>
      <div ref={mapContainerRef} style={styles.map} />

      <div style={styles.markerContainer}>
        <div style={styles.markerOuter}>
          <div style={styles.markerInner} />
        </div>
      </div>

      <div style={styles.bottomCard}>
        <h3 style={styles.title}>
          {isPermissionDenied ? "حدد موقعك يدوياً" : "اختر موقع التوصيل"}
        </h3>

        {loading ? (
          <div style={styles.loadingContainer}>
            <span style={styles.spinner}></span>
            <span style={styles.loadingText}>جاري تحديد العنوان...</span>
          </div>
        ) : (
          <p style={styles.addressText}>
            {address || "قم بتحريك الخريطة لتحديد الموقع"}
          </p>
        )}

        <button
          type="button"
          style={{
            ...styles.confirmButton,
            ...(loading ? styles.disabledButton : {}),
          }}
          disabled={loading}
          onClick={handleConfirmLocation}
        >
          تأكيد الموقع
        </button>
      </div>

      <button
        type="button"
        style={{
          ...styles.currentLocationButton,
          ...(isPermissionDenied ? { opacity: 0.6 } : {}),
        }}
        title="تحديد موقعي الحالي"
        onClick={getCurrentLocation}
      >
        ◎
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "400px",
    fontFamily: "sans-serif",
    direction: "rtl",
  },
  map: {
    width: "100%",
    height: "100%",
    minHeight: "400px",
  },
  markerContainer: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 1000,
  },
  markerOuter: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 113, 206, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  markerInner: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#0071ce",
  },
  bottomCard: {
    position: "absolute",
    bottom: "24px",
    left: "20px",
    right: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "#FFF",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000,
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #dbeafe",
    borderTopColor: "#0071ce",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    fontSize: "14px",
    color: "#666",
  },
  addressText: {
    fontSize: "14px",
    color: "#444",
    margin: "10px 0",
  },
  confirmButton: {
    width: "100%",
    backgroundColor: "#0071ce",
    color: "#FFF",
    border: "none",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "#A2C9FF",
    cursor: "not-allowed",
  },
  currentLocationButton: {
    position: "absolute",
    bottom: "210px",
    right: "20px",
    backgroundColor: "#FFF",
    border: "none",
    width: "50px",
    height: "50px",
    borderRadius: "25px",
    fontSize: "24px",
    color: "#0071ce",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    zIndex: 1000,
  },
};
