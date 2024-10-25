import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  VStack,
  HStack,
  Text,
  Button,
  Modal,
  FormControl,
  Input,
  FlatList,
  Divider,
  Icon
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../../components/Layout'
import { INavigationParamList } from '../../models/navigationModel'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { IJadwalCreateRequestModel, IJadwalModel } from '../../models/attendanceModel'
import { useHttp } from '../../hooks/useHttp'
import { RefreshControl, TouchableOpacity } from 'react-native'

type AttendanceScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'Attendance'
>

export default function AttendanceScreenView({
  navigation
}: AttendanceScreenViewPropsTypes) {
  const [attendance, setAttendance] = useState<IJadwalModel[]>([])
  const { handleGetTableDataRequest } = useHttp()
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setpageSize] = useState(0)

  const getAttendance = async () => {
    try {
      setIsLoading(true)
      const result = await handleGetTableDataRequest({
        path: '/jadwal',
        page: pageSize,
        size: 10,
        filter: {}
      })
      if (result) {
        setAttendance(result.items)
      }

      console.log(result.items)
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onRefresh = useCallback(async () => {
    await getAttendance()
  }, [])

  useEffect(() => {
    getAttendance()
  }, [])

  const handleCheckIn = (id: number) => {
    // Logic for check-in
    console.log(`Check-in for user with id: ${id}`)
  }

  const handleCheckOut = (id: number) => {
    // Logic for check-out
    console.log(`Check-out for user with id: ${id}`)
  }

  return (
    <Layout>
      <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        data={attendance}
        renderItem={({ item }) => (
          <VStack>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailAttendance', { attendanceId: 1 })}
            >
              <HStack
                justifyContent='space-between'
                py={4}
                alignItems='center'
                bg='white'
                rounded='md'
                px={4}
              >
                <VStack flex={1}>
                  <Text fontSize='lg' fontWeight='bold'>
                    {item.toko.tokoName}
                  </Text>
                  <Text fontSize='sm' color='gray.400'>
                    Schedule: {item.jadwalName} | Date: {item.jadwalEndDate}
                  </Text>
                </VStack>
                <HStack space={2}>
                  {item.jadwalStatus !== 'Present' ? (
                    <Text color={'blue'}>Check In</Text>
                  ) : (
                    <Button
                      leftIcon={<Icon as={Ionicons} name='log-out-outline' />}
                      colorScheme='red'
                      variant={'outline'}
                      onPress={() => handleCheckOut(item.id)}
                    >
                      Check Out
                    </Button>
                  )}
                </HStack>
              </HStack>
              <Divider />
            </TouchableOpacity>
          </VStack>
        )}
        keyExtractor={(item) => item.jadwalId.toString()}
      />
    </Layout>
  )
}
