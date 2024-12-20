import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import { INavigationParamList } from "../../models/navigationModel";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useHttp } from "../../hooks/useHttp";
import { RefreshControl, TouchableOpacity } from "react-native";
import { IScheduleModel } from "../../models/scheduleModel";
import { useFocusEffect } from "@react-navigation/native";
import { convertISOToRegular } from "../../utilities/convertTime";

type AttendanceScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Attendance"
>;

export default function AttendanceScreenView({
  navigation,
}: AttendanceScreenViewPropsTypes) {
  const [attendance, setAttendance] = useState<IScheduleModel[]>([]);
  const { handleGetTableDataRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setpageSize] = useState(0);

  const getAttendance = async () => {
    try {
      setIsLoading(true);
      const result = await handleGetTableDataRequest({
        path: "/schedules",
        page: pageSize,
        size: 10,
        filter: {},
      });
      if (result) {
        setAttendance(result.items);
      }

      console.log(result.items);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "checkin":
        return "green.500";
      case "checkout":
        return "red.500";
      case "waiting":
        return "yellow.500";
      default:
        return "gray.500";
    }
  };

  const onRefresh = useCallback(async () => {
    await getAttendance();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAttendance();
    }, [])
  );

  useEffect(() => {
    getAttendance();
  }, []);

  return (
    <Layout>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={attendance}
        renderItem={({ item }) => (
          <VStack>
            <TouchableOpacity
              disabled={item.scheduleStatus === "checkout"}
              onPress={() =>
                navigation.navigate("DetailAttendance", {
                  attendanceId: item.scheduleId,
                })
              }
            >
              <HStack
                justifyContent="space-between"
                py={4}
                alignItems="center"
                bg="white"
                rounded="md"
                px={4}
                opacity={item.scheduleStatus === "checkout" ? 0.5 : 1}
              >
                <VStack flex={1}>
                  <Text fontSize="lg" fontWeight="bold">
                    {item.store.storeName}
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Schedule: {item.scheduleName} | Date:{" "}
                    {convertISOToRegular(item.scheduleEndDate)}
                  </Text>
                </VStack>
                <HStack space={2}>
                  <Text color={getStatusColor(item.scheduleStatus)}>
                    {item.scheduleStatus}
                  </Text>
                </HStack>
              </HStack>
              <Divider />
            </TouchableOpacity>
          </VStack>
        )}
        keyExtractor={(item) => item.scheduleId.toString()}
      />
    </Layout>
  );
}
