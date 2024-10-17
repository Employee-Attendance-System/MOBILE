import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  VStack,
  HStack,
  Text,
  Button,
  FlatList,
  Divider,
  Icon,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../../components/Layout";
import { INavigationParamList } from "../../models/navigationModel";
import { useLayoutEffect } from "react";

type ListJadwalScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Jadwal"
>;

export default function ListJadwalScreenView({
  navigation,
}: ListJadwalScreenViewPropsTypes) {
  const tasks = [
    {
      id: 1,
      name: "Finish report",
      date: "10 Oct",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 2,
      name: "Team Meeting",
      date: "11 Oct",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Code Review",
      date: "12 Oct",
      status: "Completed",
      priority: "Low",
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
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <VStack>
            <HStack
              justifyContent="space-between"
              py={2}
              alignItems="center"
              bg="white"
              rounded="md"
              shadow={1}
              px={4}
            >
              <VStack flex={1}>
                <Text fontWeight="bold">{item.name}</Text>
                <Text fontSize="sm" color="gray.400">
                  Due: {item.date}
                </Text>
              </VStack>
              <Text
                color={
                  item.status === "In Progress"
                    ? "orange.400"
                    : item.status === "Completed"
                    ? "green.400"
                    : "blue.400"
                }
              >
                {item.status}
              </Text>
              <Icon
                as={Ionicons}
                name={
                  item.priority === "High"
                    ? "arrow-up-circle"
                    : item.priority === "Medium"
                    ? "arrow-forward-circle"
                    : "arrow-down-circle"
                }
                size="lg"
                color={
                  item.priority === "High"
                    ? "red.400"
                    : item.priority === "Medium"
                    ? "orange.400"
                    : "green.400"
                }
              />
            </HStack>
            <Divider />
          </VStack>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </Layout>
  );
}
