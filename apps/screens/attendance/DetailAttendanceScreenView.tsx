import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, HStack, View, Text, VStack } from 'native-base'
import Layout from '../../components/Layout'
import { INavigationParamList } from '../../models/navigationModel'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/useHttp'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import ListSkeleton from '../../components/skeleton/ListSkeleton'
import { IGpsLocationCreateRequest } from '../../models/gpsLocationModel'
import * as Location from 'expo-location'

type DetailAttendanceScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'DetailAttendance'
>

export default function DetailAttendanceScreenView({
  navigation
}: DetailAttendanceScreenViewPropsTypes) {
  const [location, setLocation] = useState<any>()
  const { handlePostRequest } = useHttp()

  const [loading, setLoading] = useState(false)

  const getLocation = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      })

      if (currentLocation) {
        setLocation({
          accuracy: currentLocation.coords.accuracy,
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        })

        const payload: IGpsLocationCreateRequest = {
          gpsLocationLatitude: currentLocation.coords.latitude.toString(),
          gpsLocationLongitude: currentLocation.coords.longitude.toString()
        }

        // await handlePostRequest({
        //   path: '/gps-locations',
        //   body: payload
        // })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getIntervalLocation = async () => {
    await getLocation()
  }

  const getInitLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('Permission to access location was denied')
        return
      }

      setLoading(true)
      getLocation()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getInitLocation()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      getIntervalLocation()
    }, 1000 * 5)

    return () => clearInterval(interval)
  }, [])

  if (loading) return <ListSkeleton />

  return (
    <Layout>
      <View style={styles.container}>
        {location && (
          <MapView style={styles.map} region={location}>
            <Marker coordinate={location} title='marker' />
          </MapView>
        )}
        <VStack space={2} paddingTop={5} paddingX={2}>
          <Text textAlign={'center'}>Pastikan anda berada di lokasi toko</Text>
          <HStack space={2} justifyContent={'space-around'}>
            <Button flex={1}>Check In</Button>
            <Button flex={1}>Check Out</Button>
          </HStack>
        </VStack>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: '100%',
    height: '80%'
  }
})
