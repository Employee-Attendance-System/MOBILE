import React, { useEffect, useLayoutEffect, useState } from "react";
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
  Icon,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { INavigationParamList } from "../../models/navigationModel";
import Layout from "../../components/Layout";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { useHttp } from "../../hooks/useHttp";
import { IStoreModel } from "../../models/storeModel";
import { IScheduleCreateRequestModel } from "../../models/scheduleModel";

type CreateScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "CreateSchedule"
>;

export default function CreateScheduleScreenView({
  navigation,
}: CreateScheduleScreenViewPropsTypes) {
  const { handleGetRequest, handlePostRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [toko, setToko] = useState<IStoreModel[]>([]);
  const [schedule, setSchedule] = useState({
    scheduleName: "",
    scheduleDescription: "",
    scheduleStoreId: 0,
    scheduleStartDate: "",
    scheduleEndDate: "",
    scheduleStatus: "waiting",
  });

  const handleCreateTask = async () => {
    if (
      moment(schedule.scheduleStartDate).isAfter(
        moment(schedule.scheduleEndDate)
      )
    ) {
      alert("Invalid Date. Start date cannot be after end date.");
      return;
    } else {
      const payload: IScheduleCreateRequestModel = schedule;
      try {
        const result = await handlePostRequest({
          path: "/schedules",
          body: payload,
        });
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showDatePicker = (type: "start" | "end") => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "date",
      is24Hour: true,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = moment(currentDate).format("YYYY-MM-DD");
        if (type === "start") {
          setSchedule({ ...schedule, scheduleStartDate: formattedDate });
        } else {
          setSchedule({ ...schedule, scheduleEndDate: formattedDate });
        }
      },
    });
  };

  const showTimePicker = (type: "start" | "end") => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: "time",
      is24Hour: true,
      onChange: (event, selectedTime) => {
        const currentTime = selectedTime || new Date();
        const formattedTime = moment(currentTime).format("HH:mm");
        if (type === "start") {
          setSchedule((prev) => ({
            ...prev,
            scheduleStartDate: `${prev.scheduleStartDate} ${formattedTime}`,
          }));
        } else {
          setSchedule((prev) => ({
            ...prev,
            scheduleEndDate: `${prev.scheduleEndDate} ${formattedTime}`,
          }));
        }
      },
    });
  };

  const getStores = async () => {
    try {
      setIsLoading(true);
      const result = await handleGetRequest({
        path: "/stores",
      });
      if (result) {
        setToko(result.items);
        console.log(result);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Buat Jadwal",
    });
  }, [navigation]);

  return (
    <Layout>
      <FormControl mt={5}>
        <FormControl.Label>Nama Jadwal</FormControl.Label>
        <Input
          placeholder="Enter schedule name"
          value={schedule.scheduleName}
          onChangeText={(text) =>
            setSchedule({ ...schedule, scheduleName: text })
          }
        />
      </FormControl>

      <FormControl>
        <FormControl.Label>Toko</FormControl.Label>
        <Select
          selectedValue={schedule.scheduleStoreId.toString()}
          minWidth="200"
          accessibilityLabel="Choose toko"
          placeholder="Choose toko"
          onValueChange={(itemValue) =>
            setSchedule({ ...schedule, scheduleStoreId: Number(itemValue) })
          }
          _selectedItem={{
            bg: "blue.200",
            endIcon: <CheckIcon size="5" />,
          }}
        >
          {toko.map((item) => (
            <Select.Item
              key={item.id}
              label={item.storeName}
              value={item.storeId.toString()}
            />
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormControl.Label>Deskripsi</FormControl.Label>
        <TextArea
          placeholder="Enter description"
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
            onPress={() => showDatePicker("start")}
            bg="blue.500"
            _text={{ color: "white" }}
            leftIcon={
              <Icon as={MaterialIcons} name="event" size="sm" color="white" />
            }
            flex={1}
          >
            {schedule.scheduleStartDate
              ? schedule.scheduleStartDate.split(" ")[0]
              : "Pilih Tanggal Mulai"}
          </Button>
          <Button
            onPress={() => showTimePicker("start")}
            bg="blue.500"
            _text={{ color: "white" }}
            leftIcon={
              <Icon
                as={MaterialIcons}
                name="access-time"
                size="sm"
                color="white"
              />
            }
            flex={1}
          >
            {schedule.scheduleStartDate.includes(" ")
              ? schedule.scheduleStartDate.split(" ")[1]
              : "Pilih Jam Mulai"}
          </Button>
        </HStack>
      </FormControl>

      {/* End Date Picker */}
      <FormControl>
        <FormControl.Label>Tanggal Selesai</FormControl.Label>
        <HStack space={2}>
          <Button
            onPress={() => showDatePicker("end")}
            bg="blue.500"
            _text={{ color: "white" }}
            leftIcon={
              <Icon as={MaterialIcons} name="event" size="sm" color="white" />
            }
            flex={1}
          >
            {schedule.scheduleEndDate
              ? schedule.scheduleEndDate.split(" ")[0]
              : "Pilih Tanggal Selesai"}
          </Button>
          <Button
            onPress={() => showTimePicker("end")}
            bg="blue.500"
            _text={{ color: "white" }}
            leftIcon={
              <Icon
                as={MaterialIcons}
                name="access-time"
                size="sm"
                color="white"
              />
            }
            flex={1}
          >
            {schedule.scheduleEndDate.includes(" ")
              ? schedule.scheduleEndDate.split(" ")[1]
              : "Pilih Jam Selesai"}
          </Button>
        </HStack>
      </FormControl>

      <Button
        onPress={handleCreateTask}
        bg="blue.500"
        mt={5}
        _text={{ color: "white" }}
      >
        Simpan
      </Button>
    </Layout>
  );
}
