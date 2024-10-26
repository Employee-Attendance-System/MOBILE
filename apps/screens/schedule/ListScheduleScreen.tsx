import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  VStack,
  HStack,
  Text,
  Button,
  FlatList,
  Divider,
  Icon,
  IconButton,
  Modal
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../../components/Layout'
import { INavigationParamList } from '../../models/navigationModel'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useHttp } from '../../hooks/useHttp'
import { convertISOToRegular } from '../../utilities/convertTime'
import { RefreshControl } from 'react-native'
import { IScheduleModel } from '../../models/scheduleModel'

type ListScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'Schedule'
>

export default function ListScheduleScreenView({
  navigation
}: ListScheduleScreenViewPropsTypes) {
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp()
  const [isLoading, setIsLoading] = useState(false)
  const [pageSize, setpageSize] = useState(0)
  const [showModalDelet, setShowModalDelete] = useState(false)
  const [modalDeleteData, setModalDeleteData] = useState<IScheduleModel>()
  const [jadwal, setJadwal] = useState<IScheduleModel[]>([])

  const getSchedules = async () => {
    try {
      setIsLoading(true)
      const result = await handleGetTableDataRequest({
        path: '/schedules',
        page: pageSize,
        size: 10,
        filter: {}
      })
      if (result) {
        setJadwal(result.items)
      }
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

  const handleDeleteJadwalItem = async () => {
    setIsLoading(true)
    try {
      await handleRemoveRequest({
        path: '/schedules/' + modalDeleteData?.scheduleId
      })
    } catch (error: any) {
      console.log(error)
    } finally {
      await getSchedules()
      setShowModalDelete(false)
      setIsLoading(false)
    }
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
                <Text fontWeight='bold'>{item.scheduleName}</Text>
                <Text fontSize='sm' color='gray.400'>
                  {item.scheduleDescription}
                </Text>
                <Text fontSize='sm' color='gray.400'>
                  Start: {convertISOToRegular(item.scheduleStartDate)} | End:
                  {convertISOToRegular(item.scheduleEndDate)}
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
                  onPress={() => handleEdit(item.scheduleId)}
                  _pressed={{ bg: 'blue.100' }}
                />
                <IconButton
                  icon={
                    <Icon as={Ionicons} name='trash-outline' size='lg' color='red.500' />
                  }
                  onPress={() => {
                    setShowModalDelete(true)
                    setModalDeleteData(item)
                  }}
                  _pressed={{ bg: 'red.100' }}
                />
              </HStack>
            </HStack>
            <Divider />
          </VStack>
        )}
        keyExtractor={(item) => item.scheduleId.toString()}
      />
      <Modal isOpen={showModalDelet} onClose={() => setShowModalDelete(false)}>
        <Modal.Content maxWidth='400px'>
          <Modal.CloseButton />
          <Modal.Header>Peringatan!</Modal.Header>
          <Modal.Body>
            <Text>Apakah anda yakin ingin menghapus jadwal ini?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant='ghost'
                colorScheme='blueGray'
                onPress={() => {
                  setShowModalDelete(false)
                }}
              >
                Cancel
              </Button>
              <Button colorScheme={'red'} onPress={handleDeleteJadwalItem}>
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Layout>
  )
}
