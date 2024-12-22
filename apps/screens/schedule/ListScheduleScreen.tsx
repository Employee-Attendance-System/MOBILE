import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import { INavigationParamList } from "../../models/navigationModel";
import { RefreshControl } from "react-native";
import { IScheduleModel } from "../../models/scheduleModel";
import { useHttp } from "../../hooks/useHttp";
import { convertISOToRegular } from "../../utilities/convertTime";
import { useFocusEffect } from "@react-navigation/native";

type ListScheduleScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Schedule"
>;

export default function ListScheduleScreenView({
  navigation,
}: ListScheduleScreenViewPropsTypes) {
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<IScheduleModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalDeleteData, setModalDeleteData] = useState<IScheduleModel>();

  const getSchedules = async () => {
    try {
      setIsLoading(true);
      const filter: any = {};

      if (searchTerm) filter.search = searchTerm;

      const result = await handleGetTableDataRequest({
        path: "/schedules",
        page: 0,
        size: 10,
        filter,
      });

      if (result) {
        setSchedule(result.items);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSchedules();
  }, [searchTerm]);

  const onRefresh = useCallback(async () => {
    await getSchedules();
  }, [searchTerm]);

  const handleDeletescheduleItem = async () => {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack marginRight={5}>
          <Button
            variant={"outline"}
            onPress={() => navigation.navigate("CreateSchedule")}
          >
            Create
          </Button>
        </HStack>
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      getSchedules();
    }, [])
  );

  return (
    <Layout>
      <VStack space={4} mb={2} rounded="md">
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
      </VStack>

      {/* Schedule List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={schedule}
        renderItem={({ item }) => (
          <VStack>
            <HStack
              justifyContent="space-between"
              alignItems="flex-start"
              bg="white"
              rounded="md"
              pb={5}
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
                <Text color={getStatusColor(item.scheduleStatus)}>
                  {mapScheduleStatusName(item.scheduleStatus)}
                </Text>
              </VStack>
              <HStack space={2}>
                <IconButton
                  disabled={item.scheduleStatus !== "waiting"}
                  icon={
                    <Icon
                      as={Ionicons}
                      name="create-outline"
                      size="lg"
                      color="blue.500"
                      opacity={item.scheduleStatus !== "waiting" ? 0.3 : 1}
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
              <Button colorScheme="red" onPress={handleDeletescheduleItem}>
                Delete
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Layout>
  );
}

const mapScheduleStatusName = (status: string) => {
  switch (status) {
    case "checkin":
      return "Berlangsung";
    case "checkout":
      return "Selesai";
    case "waiting":
      return "Menunggu";
    default:
      return "unknown";
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "checkin":
      return "green.500";
    case "checkout":
      return "blue.500";
    case "waiting":
      return "yellow.500";
    default:
      return "gray.500";
  }
};
