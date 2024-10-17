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

type ListScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'Schedule'
>

export default function ListScheduleScreenView({
  navigation
}: ListScheduleScreenViewPropsTypes) {
  const schedules = [
    {
      id: 1,
      scheduleName: 'Morning Shift',
      scheduleDescription: 'Morning shift for Toko A',
      scheduleTokoId: 54324,
      scheduleSpgId: 1001,
      scheduleStartDate: '2024-10-15',
      scheduleEndDate: '2024-10-15'
    },
    {
      id: 2,
      scheduleName: 'Afternoon Shift',
      scheduleDescription: 'Afternoon shift for Toko B',
      scheduleTokoId: 44334,
      scheduleSpgId: 1002,
      scheduleStartDate: '2024-10-16',
      scheduleEndDate: '2024-10-16'
    },
    {
      id: 3,
      scheduleName: 'Evening Shift',
      scheduleDescription: 'Evening shift for Toko C',
      scheduleTokoId: 34533,
      scheduleSpgId: 1003,
      scheduleStartDate: '2024-10-17',
      scheduleEndDate: '2024-10-17'
    }
  ]

  const handleEdit = (id: number) => {
    // Navigate to edit screen with the selected schedule id
    // navigation.navigate('EditSchedule', { id })
  }

  const handleDelete = (id: number) => {
    // Logic to delete the schedule
    console.log(`Delete schedule with id: ${id}`)
    // Here you would likely call an API or remove the item from state
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack marginRight={5}>
          <Button
            variant={'outline'}
            onPress={() => navigation.navigate('CreateSchedule')}
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
        data={schedules}
        renderItem={({ item }) => (
          <VStack>
            <HStack
              justifyContent='space-between'
              py={2}
              alignItems='center'
              bg='white'
              rounded='md'
              shadow={1}
              px={4}
            >
              <VStack flex={1}>
                <Text fontWeight='bold'>{item.scheduleName}</Text>
                <Text fontSize='sm' color='gray.400'>
                  {item.scheduleDescription}
                </Text>
                <Text fontSize='sm' color='gray.400'>
                  Start: {item.scheduleStartDate} | End: {item.scheduleEndDate}
                </Text>
              </VStack>
              <HStack space={2}>
                <IconButton
                  icon={
                    <Icon
                      as={Ionicons}
                      name='create-outline'
                      size='lg'
                      color='blue.500'
                    />
                  }
                  onPress={() => handleEdit(item.id)}
                  _pressed={{ bg: 'blue.100' }}
                />
                <IconButton
                  icon={
                    <Icon as={Ionicons} name='trash-outline' size='lg' color='red.500' />
                  }
                  onPress={() => handleDelete(item.id)}
                  _pressed={{ bg: 'red.100' }}
                />
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
