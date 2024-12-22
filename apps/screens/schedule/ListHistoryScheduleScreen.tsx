import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  VStack,
  HStack,
  Text,
  FlatList,
  Divider,
  Icon,
  Input,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import { INavigationParamList } from "../../models/navigationModel";
import { RefreshControl } from "react-native";
import { IScheduleModel } from "../../models/scheduleModel";
import { useHttp } from "../../hooks/useHttp";
import { convertISOToRegular } from "../../utilities/convertTime";
import { useFocusEffect } from "@react-navigation/native";

type ListScheduleHistoryScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "ScheduleHistory"
>;

export default function ListScheduleHistoryScreenView({
  navigation,
}: ListScheduleHistoryScreenViewPropsTypes) {
  const { handleGetTableDataRequest } = useHttp();
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<IScheduleModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getSchedules = async () => {
    try {
      setIsLoading(true);
      const filter: any = {};

      if (searchTerm) filter.search = searchTerm;

      const result = await handleGetTableDataRequest({
        path: "/schedules",
        page: 0,
        size: 10,
        filter: { ...filter, scheduleStatus: "checkout" },
      });

      if (result) {
        setSchedule(result.items);
        console.log(result.items);
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

  useFocusEffect(
    useCallback(() => {
      getSchedules();
    }, [])
  );

  return (
    <Layout pt={8}>
      {/* Search Bar and Filters */}
      <VStack space={4} bg="white" mb={2} rounded="md">
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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        data={schedule}
        renderItem={({ item }) => (
          <VStack>
            <HStack
              justifyContent="space-between"
              py={2}
              alignItems="flex-start"
              bg="white"
              rounded="md"
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
            </HStack>
            <Divider />
          </VStack>
        )}
        keyExtractor={(item) => item.scheduleId.toString()}
        ListEmptyComponent={
          <VStack alignItems="center" justifyContent="center" mt={10} flex={1}>
            <Text fontSize="lg" color="gray.500" fontWeight="bold">
              No history data available.
            </Text>
            <Text fontSize="sm" color="gray.400">
              Pull down to refresh or create attendance.
            </Text>
          </VStack>
        }
      />
    </Layout>
  );
}
