import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  VStack,
  HStack,
  Text,
  Button,
  FlatList,
  Divider,
  Icon,
  IconButton
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../../components/Layout'
import { INavigationParamList } from '../../models/navigationModel'
import { useLayoutEffect } from 'react'

type AttendanceScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'Attendance'
>

export default function AttendanceScreenView({
  navigation
}: AttendanceScreenViewPropsTypes) {
  const attendanceData = [
    {
      id: 1,
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      status: 'Present',
      storeName: 'Toko A',
      scheduleName: 'Morning Shift',
      date: '2024-10-15'
    },
    {
      id: 2,
      checkIn: '09:30 AM',
      checkOut: '05:15 PM',
      status: 'Present',
      storeName: 'Toko B',
      scheduleName: 'Afternoon Shift',
      date: '2024-10-16'
    },
    {
      id: 3,
      checkIn: null,
      checkOut: null,
      status: 'Absent',
      storeName: 'Toko C',
      scheduleName: 'Evening Shift',
      date: '2024-10-17'
    }
  ]

  const handleCheckIn = (id: number) => {
    // Logic for check-in
    console.log(`Check-in for user with id: ${id}`)
  }

  const handleCheckOut = (id: number) => {
    // Logic for check-out
    console.log(`Check-out for user with id: ${id}`)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack marginRight={5}>
          <Button
            variant={'outline'}
            // onPress={() => navigation.navigate('')}
          >
            Create
          </Button>
        </HStack>
      )
    })
  }, [])

  return (
    <Layout>
      <FlatList
        data={attendanceData}
        renderItem={({ item }) => (
          <VStack>
            <HStack
              justifyContent='space-between'
              py={4}
              alignItems='center'
              bg='white'
              rounded='md'
              shadow={1}
              px={4}
            >
              <VStack flex={1}>
                <Text fontSize='lg' fontWeight='bold'>
                  {item.storeName}
                </Text>
                <Text fontSize='sm' color='gray.400'>
                  Schedule: {item.scheduleName} | Date: {item.date}
                </Text>
              </VStack>
              <HStack space={2}>
                {item.status !== 'Present' ? (
                  <Button
                    leftIcon={<Icon as={Ionicons} name='checkmark-outline' />}
                    colorScheme='blue'
                    variant={'outline'}
                    onPress={() => handleCheckIn(item.id)}
                  >
                    Check In
                  </Button>
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
          </VStack>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Layout>
  )
}
