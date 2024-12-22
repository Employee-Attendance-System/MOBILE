import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, HStack, View, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { INavigationParamList } from "../../models/navigationModel";
import { useEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet } from "react-native";
import ListSkeleton from "../../components/skeleton/ListSkeleton";
import { IGpsLocationCreateRequest } from "../../models/gpsLocationModel";
import * as Location from "expo-location";

type DetailAttendanceScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "DetailAttendance"
>;

export default function DetailAttendanceScreenView({
  navigation,
  route,
}: DetailAttendanceScreenViewPropsTypes) {
  const [location, setLocation] = useState<any>();
  const { handleUpdateRequest } = useHttp();
  const [loading, setLoading] = useState(false);
  const [withinRange, setWithinRange] = useState(false);
  const attendanceId = route.params.attendanceId;
  const store = route.params.store;

  // const OFFICE_LOCATION = {
  //   latitude: -5.3137477,
  //   longitude: 105.3494032,
  // };

  const MAX_DISTANCE = 100;

  const OFFICE_LOCATION = {
    latitude: parseInt(store.storeLatitude),
    longitude: parseInt(store.storeLongitude),
  };

  console.log(OFFICE_LOCATION);

  console.log(store);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const lat1Rad = toRad(lat1);
    const lat2Rad = toRad(lat2);
    const deltaLat = toRad(lat2 - lat1);
    const deltaLon = toRad(lon2 - lon1);

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const getLocation = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      if (currentLocation) {
        const { latitude, longitude } = currentLocation.coords;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });

        const distance = calculateDistance(
          latitude,
          longitude,
          OFFICE_LOCATION.latitude,
          OFFICE_LOCATION.longitude
        );

        setWithinRange(distance <= MAX_DISTANCE);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAttendance = async () => {
    await handleUpdateRequest({
      path: "/attendances",
      body: { attendanceId },
    });

    navigation.goBack();
  };

  const getInitLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const init = async () => {
    setLoading(true);
    try {
      await getInitLocation();
      await getLocation();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation();
    }, 1000 * 5); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) return <ListSkeleton />;

  return (
    <Layout>
      <View style={styles.container}>
        {location && (
          <MapView style={styles.map} region={location}>
            <Marker coordinate={location} title="Your Location" />
            <Marker
              coordinate={OFFICE_LOCATION}
              title="Office Location"
              pinColor="blue"
            />
          </MapView>
        )}
        <VStack space={2} paddingTop={5} paddingX={2}>
          {!withinRange && (
            <Text color="red.500" textAlign="center">
              You must be within 100 meters of the office
            </Text>
          )}
          <HStack space={2} justifyContent="space-around">
            <Button
              flex={1}
              colorScheme={"lightBlue"}
              isDisabled={!withinRange}
              onPress={handleAttendance}
            >
              Check In
            </Button>
          </HStack>
        </VStack>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
});
