import React, { useLayoutEffect, useState } from 'react'
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

type CreateScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  'CreateSchedule'
>

export default function CreateScheduleScreenView({
  navigation
}: CreateScheduleScreenViewPropsTypes) {
  const [schedule, setSchedule] = useState({
    scheduleName: '',
    scheduleDescription: '',
    scheduleTokoId: 0,
    scheduleStartDate: '',
    scheduleEndDate: ''
  })

  const handleCreateTask = () => {
    console.log(schedule)
    if (moment(schedule.scheduleStartDate).isAfter(moment(schedule.scheduleEndDate))) {
      alert('Invalid Date. Start date cannot be after end date.')
      return
    } else {
      console.log(schedule)
      navigation.goBack()
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Buat Jadwal'
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
            <Select.Item label='54324 (Toko A)' value='54324' />
            <Select.Item label='44334 (Toko B)' value='44334' />
            <Select.Item label='34533 (Toko C)' value='34533' />
          </Select>
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
