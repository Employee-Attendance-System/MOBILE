import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useLayoutEffect, useState } from "react";
import { INavigationParamList } from "../models/navigationModel";
import { VStack, HStack, Box, Text, FlatList, Avatar, Icon } from "native-base";

type HomeScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Home"
>;

export default function HomeScreenView({
  navigation,
}: HomeScreenViewPropsTypes) {
  const recentRequests = [
    {
      id: 1,
      name: "Shuri",
      date: "10 Apr",
      status: "Pending",
      avatar: "https://example.com/avatar1.png",
    },
    {
      id: 2,
      name: "Shuri",
      date: "20 Mar",
      status: "Approved",
      avatar: "https://example.com/avatar2.png",
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Fresh Attandence",
    });
  }, []);

  return (
    <VStack safeArea p={5} space={6} bg="gray.50" flex={1}>
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
          onPress={() => navigation.navigate("Jadwal")}
        />
        <Card
          icon="time-outline"
          label="History"
          count={12}
          color="orange"
          onPress={() => navigation.navigate("Jadwal")}
        />
      </HStack>

      {/* Recent Requests */}
      <VStack space={4}>
        <Text fontSize="lg" fontWeight="bold">
          Jadwal Kerja Terbaru
        </Text>
        <FlatList
          data={recentRequests}
          renderItem={({ item }) => (
            <HStack justifyContent="space-between" py={2} alignItems="center">
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
                <Text fontWeight="bold">{item.name}</Text>
                <Text fontSize="sm" color="gray.400">
                  {item.date}
                </Text>
              </VStack>
              <Text
                color={item.status === "Pending" ? "orange.400" : "green.400"}
              >
                {item.status}
              </Text>
            </HStack>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </VStack>
    </VStack>
  );
}

import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

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
