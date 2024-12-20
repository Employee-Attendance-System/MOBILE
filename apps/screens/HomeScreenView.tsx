import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { INavigationParamList } from "../models/navigationModel";
import {
  VStack,
  HStack,
  Box,
  Text,
  FlatList,
  Avatar,
  Icon,
  Divider,
  ScrollView,
} from "native-base";

type HomeScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Home"
>;

export default function HomeScreenView({
  navigation,
}: HomeScreenViewPropsTypes) {
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
        size: 2,
        filter: { scheduleStatusNot: "checkout" },
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Fresh Attandence",
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack safeArea p={5} space={6} bg="white" flex={1}>
        {/* Greeting Section */}
        <VStack space={2}>
          <HStack space={2}>
            <Avatar>s</Avatar>
            <Text fontSize="2xl" fontWeight="bold">
              Good Morning, Jhon
            </Text>
          </HStack>
        </VStack>
        <Text fontSize="lg" fontWeight="bold">
          Pilih Aktivitas
        </Text>
        <HStack space={3} mt={5} justifyContent="space-between">
          <Card
            icon="person-outline"
            label="Absen"
            count={23}
            color="green"
            onPress={() => navigation.navigate("Attendance")}
          />
          <Card
            icon="calendar"
            label="Jadwal"
            count={3}
            color="blue"
            onPress={() => navigation.navigate("Schedule")}
          />
          <Card
            icon="time-outline"
            label="History"
            count={12}
            color="orange"
            onPress={() => navigation.navigate("Schedule")}
          />
        </HStack>

        {/* Recent Requests */}
        <VStack space={4}>
          <Text fontSize="lg" fontWeight="bold">
            Jadwal Kerja Terbaru
          </Text>
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
                    opacity={item.scheduleStatus === "checkout" ? 0.5 : 1}
                  >
                    <Box
                      size={16}
                      rounded="full"
                      bg={`blue.100`}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={Ionicons}
                        name={"calendar"}
                        size="lg"
                        color={`blue.500`}
                      />
                    </Box>
                    <VStack flex={1} ml={4}>
                      <Text fontSize="lg" fontWeight="bold">
                        {item.store?.storeName}
                      </Text>
                      <Text fontSize="sm" color="gray.400">
                        Deadline {convertISOToRegular(item.scheduleEndDate)}
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
        </VStack>
      </VStack>
    </ScrollView>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { RefreshControl, TouchableOpacity } from "react-native";
import { IScheduleModel } from "../models/scheduleModel";
import { useHttp } from "../hooks/useHttp";
import { useFocusEffect } from "@react-navigation/native";
import { convertISOToRegular } from "../utilities/convertTime";

interface CardProps {
  icon: string;
  label: string;
  count: number;
  color: string;
  onPress: () => void;
}

const Card = ({ icon, label, count, color, onPress }: CardProps) => {
  return (
    <Box
      flex={1}
      bg="white"
      p={4}
      rounded="lg"
      shadow={2}
      alignItems="center"
      justifyContent="center"
      borderColor="coolGray.200"
      borderWidth={1}
    >
      <TouchableOpacity onPress={onPress}>
        <Box
          size={16}
          rounded="full"
          bg={`${color}.100`}
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={Ionicons} name={icon} size="lg" color={`${color}.500`} />
        </Box>
        <Text fontSize="md" fontWeight="bold" mt={3}>
          {label}
        </Text>
        {/* <Text fontSize="lg" color={`${color}.500`} fontWeight="bold" mt={1}>
          {count}
        </Text> */}
      </TouchableOpacity>
    </Box>
  );
};
