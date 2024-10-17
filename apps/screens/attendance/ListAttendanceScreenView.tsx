import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  VStack,
  HStack,
  Text,
  Button,
  FlatList,
  Divider,
  Avatar,
} from "native-base";
import Layout from "../../components/Layout";
import { INavigationParamList } from "../../models/navigationModel";
import { useLayoutEffect } from "react";

type AttendanceScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Attendance"
>;

export default function AttendanceScreenView({
  navigation,
}: AttendanceScreenViewPropsTypes) {
  const attendanceData = [
    {
      id: 1,
      name: "John Doe",
      checkIn: "09:00 AM",
      checkOut: "05:00 PM",
      status: "Present",
      avatar: "https://example.com/avatar1.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      checkIn: "09:30 AM",
      checkOut: "05:15 PM",
      status: "Present",
      avatar: "https://example.com/avatar2.png",
    },
    {
      id: 3,
      name: "Peter Parker",
      checkIn: null,
      checkOut: null,
      status: "Absent",
      avatar: "https://example.com/avatar3.png",
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack marginRight={5}>
          <Button
            variant={"outline"}
            onPress={() => navigation.navigate("CreateJadwal")}
          >
            Create
          </Button>
        </HStack>
      ),
    });
  }, []);

  return (
    <Layout>
      <VStack safeArea space={6} bg="gray.50" flex={1}>
        <FlatList
          data={attendanceData}
          renderItem={({ item }) => (
            <VStack>
              <HStack
                justifyContent="space-between"
                py={3}
                alignItems="center"
                bg="white"
                rounded="md"
                shadow={1}
                px={4}
              >
                <Avatar source={{ uri: item.avatar }} />
                <VStack flex={1} ml={4}>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text fontSize="sm" color="gray.400">
                    {item.status === "Present"
                      ? `Check-in: ${item.checkIn}`
                      : "Not Checked In"}
                  </Text>
                  {item.status === "Present" && (
                    <Text fontSize="sm" color="gray.400">
                      Check-out: {item.checkOut}
                    </Text>
                  )}
                </VStack>
                <Text
                  color={item.status === "Present" ? "green.400" : "red.400"}
                >
                  {item.status}
                </Text>
              </HStack>
              <Divider />
            </VStack>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </VStack>
    </Layout>
  );
}
