import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  VStack,
  HStack,
  Text,
  Button,
  FlatList,
  Divider,
  Icon,
  IconButton,
  Input,
  Modal,
  Box,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import { INavigationParamList } from "../../models/navigationModel";
import { RefreshControl } from "react-native";
import { IScheduleModel } from "../../models/scheduleModel";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useHttp } from "../../hooks/useHttp";
import { convertISOToRegular } from "../../utilities/convertTime";
import moment from "moment";

type ListScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Schedule"
>;

export default function ListScheduleScreenView({
  navigation,
}: ListScheduleScreenViewPropsTypes) {
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [jadwal, setJadwal] = useState<IScheduleModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState<IScheduleModel>();

  // Fetch Schedules
  const getSchedules = async () => {
    try {
      setIsLoading(true);
      const filter: any = {};

      if (startDate) filter.startDate = startDate.toISOString();
      if (endDate) filter.endDate = endDate.toISOString();
      if (searchTerm) filter.search = searchTerm;

      const result = await handleGetTableDataRequest({
        path: "/schedules",
        page: 0,
        size: 10,
        filter,
      });

      if (result) {
        setJadwal(result.items);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSchedules();
  }, [searchTerm, startDate, endDate]);

  const onRefresh = useCallback(async () => {
    await getSchedules();
  }, [startDate, endDate, searchTerm]);

  const handleDeleteJadwalItem = async () => {
    setIsLoading(true);
    try {
      await handleRemoveRequest({
        path: "/schedules/" + modalDeleteData?.scheduleId,
      });
    } catch (error: any) {
      console.log(error);
    } finally {
      await getSchedules();
      setShowModalDelete(false);
      setIsLoading(false);
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
          setStartDate(new Date(formattedDate));
        } else {
          setEndDate(new Date(formattedDate));
        }
      },
    });
  };

  return (
    <Layout>
      {/* Search Bar and Filters */}
      <VStack space={4} p={4} bg="white" mb={2} rounded="md">
        <Input
          placeholder="Search Schedules"
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          variant="filled"
          bg="gray.100"
          borderRadius="10"
          py={2}
          px={3}
          InputLeftElement={
            <Icon
              as={Ionicons}
              name="search"
              size={5}
              ml={2}
              color="gray.500"
            />
          }
        />

        {/* Date Filters */}
        <HStack space={3} justifyContent="space-between">
          <Box flex={1}>
            <Text fontSize="sm" mb={1}>
              Start Date
            </Text>
            <Button
              onPress={() => showDatePicker("start")}
              bg="blue.500"
              _text={{ color: "white" }}
              leftIcon={
                <Icon as={Ionicons} name="calendar" size="sm" color="white" />
              }
            >
              {startDate
                ? moment(startDate).format("YYYY-MM-DD")
                : "Pick Start Date"}
            </Button>
          </Box>

          <Box flex={1}>
            <Text fontSize="sm" mb={1}>
              End Date
            </Text>
            <Button
              onPress={() => showDatePicker("end")}
              bg="blue.500"
              _text={{ color: "white" }}
              leftIcon={
                <Icon as={Ionicons} name="calendar" size="sm" color="white" />
              }
              flex={1}
            >
              {endDate ? moment(endDate).format("YYYY-MM-DD") : "Pick End Date"}
            </Button>
          </Box>
        </HStack>
      </VStack>

      {/* Schedule List */}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={jadwal}
        renderItem={({ item }) => (
          <VStack>
            <HStack
              justifyContent="space-between"
              py={2}
              alignItems="center"
              bg="white"
              rounded="md"
              px={4}
            >
              <VStack flex={1}>
                <Text fontWeight="bold">{item.scheduleName}</Text>
                <Text fontSize="sm" color="gray.400">
                  {item.scheduleDescription}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  Start: {convertISOToRegular(item.scheduleStartDate)} | End:{" "}
                  {convertISOToRegular(item.scheduleEndDate)}
                </Text>
              </VStack>
              <HStack space={2}>
                <IconButton
                  icon={
                    <Icon
                      as={Ionicons}
                      name="create-outline"
                      size="lg"
                      color="blue.500"
                    />
                  }
                  onPress={() =>
                    navigation.navigate("EditSchedule", { id: item.scheduleId })
                  }
                  _pressed={{ bg: "blue.100" }}
                />
                <IconButton
                  icon={
                    <Icon
                      as={Ionicons}
                      name="trash-outline"
                      size="lg"
                      color="red.500"
                    />
                  }
                  onPress={() => {
                    setShowModalDelete(true);
                    setModalDeleteData(item);
                  }}
                  _pressed={{ bg: "red.100" }}
                />
              </HStack>
            </HStack>
            <Divider />
          </VStack>
        )}
        keyExtractor={(item) => item.scheduleId.toString()}
      />

      {/* Modal for Deleting Schedule */}
      <Modal isOpen={showModalDelete} onClose={() => setShowModalDelete(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Warning!</Modal.Header>
          <Modal.Body>
            <Text>Are you sure you want to delete this schedule?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" onPress={() => setShowModalDelete(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onPress={handleDeleteJadwalItem}>
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Layout>
  );
}
