import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  VStack,
  Input,
  FormControl,
  Button,
  Select,
  CheckIcon,
  TextArea,
  Box,
  HStack,
  Icon
} from 'native-base'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { INavigationParamList } from '../../models/navigationModel'
import Layout from '../../components/Layout'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import moment from 'moment'
import { MaterialIcons } from '@expo/vector-icons'
import { useHttp } from '../../hooks/useHttp'
import { ITokoModel } from '../../models/tokoModel'
import {
  IJadwalCreateRequestModel,
  IJadwalUpdateRequestModel
} from '../../models/jadwalModel'

type EditScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'EditSchedule'
>

export default function EditScheduleScreenView({
  navigation,
  route
}: EditScheduleScreenViewPropsTypes) {
  const { handleGetRequest, handleUpdateRequest } = useHttp()
  const [isLoading, setIsLoading] = useState(false)
  const [toko, setToko] = useState<ITokoModel[]>([])
  const [schedule, setSchedule] = useState({
    scheduleName: '',
    scheduleDescription: '',
    scheduleTokoId: 0,
    scheduleStartDate: '',
    scheduleEndDate: ''
  })

  const handleCreateTask = async () => {
    console.log(schedule)
    if (moment(schedule.scheduleStartDate).isAfter(moment(schedule.scheduleEndDate))) {
      alert('Invalid Date. Start date cannot be after end date.')
      return
    } else {
      const payload: IJadwalUpdateRequestModel = {
        jadwalId: route.params.id,
        jadwalName: schedule.scheduleName,
        jadwalDescription: schedule.scheduleDescription,
        jadwalTokoId: schedule.scheduleTokoId,
        jadwalUserId: 1,
        jadwalStartDate: schedule.scheduleStartDate,
        jadwalEndDate: schedule.scheduleEndDate,
        jadwalStatus: 'waiting'
      }
      try {
        await handleUpdateRequest({
          path: '/jadwal',
          body: payload
        })
        navigation.goBack()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showDatePicker = (type: 'start' | 'end') => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'date',
      is24Hour: true,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || new Date()
        const formattedDate = moment(currentDate).format('YYYY-MM-DD')
        if (type === 'start') {
          setSchedule({ ...schedule, scheduleStartDate: formattedDate })
        } else {
          setSchedule({ ...schedule, scheduleEndDate: formattedDate })
        }
      }
    })
  }

  const showTimePicker = (type: 'start' | 'end') => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'time',
      is24Hour: true,
      onChange: (event, selectedTime) => {
        const currentTime = selectedTime || new Date()
        const formattedTime = moment(currentTime).format('HH:mm')
        if (type === 'start') {
          setSchedule((prev) => ({
            ...prev,
            scheduleStartDate: `${prev.scheduleStartDate} ${formattedTime}`
          }))
        } else {
          setSchedule((prev) => ({
            ...prev,
            scheduleEndDate: `${prev.scheduleEndDate} ${formattedTime}`
          }))
        }
      }
    })
  }

  const getToko = async () => {
    try {
      setIsLoading(true)
      const result = await handleGetRequest({
        path: '/toko'
      })
      if (result) {
        setToko(result.items)
        console.log(result)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSchedule = async () => {
    try {
      setIsLoading(true)
      const result = await handleGetRequest({
        path: '/jadwal/detail/' + route.params.id
      })
      if (result) {
        // setSchedule(result.items)
        setSchedule({
          scheduleName: result.jadwalName,
          scheduleDescription: result.jadwalDescription,
          scheduleTokoId: result.jadwalTokoId,
          scheduleStartDate: '',
          scheduleEndDate: ''
        })
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getToko()
    getSchedule()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit Jadwal'
    })
  }, [navigation])

  return (
    <Layout>
      <VStack safeArea p={5} space={6} bg='gray.50' flex={1}>
        <FormControl>
          <FormControl.Label>Nama Jadwal</FormControl.Label>
          <Input
            placeholder='Enter schedule name'
            value={schedule.scheduleName}
            onChangeText={(text) => setSchedule({ ...schedule, scheduleName: text })}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Toko</FormControl.Label>
          <Select
            selectedValue={schedule.scheduleTokoId.toString()}
            minWidth='200'
            accessibilityLabel='Choose toko'
            placeholder='Choose toko'
            onValueChange={(itemValue) =>
              setSchedule({ ...schedule, scheduleTokoId: Number(itemValue) })
            }
            _selectedItem={{
              bg: 'blue.200',
              endIcon: <CheckIcon size='5' />
            }}
          >
            {toko.map((item) => (
              <Select.Item
                key={item.id}
                label={item.tokoName}
                value={item.tokoId.toString()}
              />
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormControl.Label>Deskripsi</FormControl.Label>
          <TextArea
            placeholder='Enter description'
            value={schedule.scheduleDescription}
            onChangeText={(text) =>
              setSchedule({ ...schedule, scheduleDescription: text })
            }
            h={20}
            autoCompleteType={undefined}
          />
        </FormControl>

        {/* Start Date Picker */}
        <FormControl>
          <FormControl.Label>Tanggal Mulai</FormControl.Label>
          <HStack space={2}>
            <Button
              onPress={() => showDatePicker('start')}
              bg='blue.500'
              _text={{ color: 'white' }}
              leftIcon={<Icon as={MaterialIcons} name='event' size='sm' color='white' />}
              flex={1}
            >
              {schedule.scheduleStartDate
                ? schedule.scheduleStartDate.split(' ')[0]
                : 'Pilih Tanggal Mulai'}
            </Button>
            <Button
              onPress={() => showTimePicker('start')}
              bg='blue.500'
              _text={{ color: 'white' }}
              leftIcon={
                <Icon as={MaterialIcons} name='access-time' size='sm' color='white' />
              }
              flex={1}
            >
              {schedule.scheduleStartDate.includes(' ')
                ? schedule.scheduleStartDate.split(' ')[1]
                : 'Pilih Jam Mulai'}
            </Button>
          </HStack>
        </FormControl>

        {/* End Date Picker */}
        <FormControl>
          <FormControl.Label>Tanggal Selesai</FormControl.Label>
          <HStack space={2}>
            <Button
              onPress={() => showDatePicker('end')}
              bg='blue.500'
              _text={{ color: 'white' }}
              leftIcon={<Icon as={MaterialIcons} name='event' size='sm' color='white' />}
              flex={1}
            >
              {schedule.scheduleEndDate
                ? schedule.scheduleEndDate.split(' ')[0]
                : 'Pilih Tanggal Selesai'}
            </Button>
            <Button
              onPress={() => showTimePicker('end')}
              bg='blue.500'
              _text={{ color: 'white' }}
              leftIcon={
                <Icon as={MaterialIcons} name='access-time' size='sm' color='white' />
              }
              flex={1}
            >
              {schedule.scheduleEndDate.includes(' ')
                ? schedule.scheduleEndDate.split(' ')[1]
                : 'Pilih Jam Selesai'}
            </Button>
          </HStack>
        </FormControl>

        <Button onPress={handleCreateTask} bg='blue.500' _text={{ color: 'white' }}>
          Simpan
        </Button>
      </VStack>
    </Layout>
  )
}