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
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useHttp } from '../../hooks/useHttp'
import { IJadwalModel } from '../../models/jadwalModel'
import { convertISOToRegular } from '../../utilities/convertTime'
import { RefreshControl } from 'react-native'

type ListScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'Schedule'
>

export default function ListScheduleScreenView({
  navigation
}: ListScheduleScreenViewPropsTypes) {
  const { handleGetTableDataRequest } = useHttp()
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setpageSize] = useState(0)

  const [jadwal, setJadwal] = useState<IJadwalModel[]>([])

  const getSchedules = async () => {
    try {
      setIsLoading(true)
      const result = await handleGetTableDataRequest({
        path: '/jadwal',
        page: pageSize,
        size: 10,
        filter: {}
      })
      if (result) {
        setJadwal(result.items)
      }

      console.log(result.items)
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onRefresh = useCallback(async () => {
    await getSchedules()
  }, [])

  useEffect(() => {
    getSchedules()
  }, [])

  const handleEdit = (id: number) => {
    // Navigate to edit screen with the selected schedule id
    navigation.navigate('EditSchedule', { id })
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
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
        data={jadwal}
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
                <Text fontWeight='bold'>{item.jadwalName}</Text>
                <Text fontSize='sm' color='gray.400'>
                  {item.jadwalDescription}
                </Text>
                <Text fontSize='sm' color='gray.400'>
                  Start: {convertISOToRegular(item.jadwalStartDate)} | End:
                  {convertISOToRegular(item.jadwalEndDate)}
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
                  onPress={() => handleEdit(item.jadwalId)}
                  _pressed={{ bg: 'blue.100' }}
                />
                <IconButton
                  icon={
                    <Icon as={Ionicons} name='trash-outline' size='lg' color='red.500' />
                  }
                  onPress={() => handleDelete(item.jadwalId)}
                  _pressed={{ bg: 'red.100' }}
                />
              </HStack>
            </HStack>
            <Divider />
          </VStack>
        )}
        keyExtractor={(item) => item.jadwalId.toString()}
      />
    </Layout>
  )
}
