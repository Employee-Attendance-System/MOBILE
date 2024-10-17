import React, { ReactNode, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Avatar,
  HStack,
  Text,
  VStack,
  Box,
  Button,
  Icon,
  Switch,
  Badge,
  ScrollView,
} from "native-base";
import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { BASE_COLOR } from "../utilities/baseColor";
import { TouchableOpacity } from "react-native";
import ModalPrimary from "../components/Modal/ModalPrimary";
import { useAppContext } from "../context/app.context";
import { useAuthToken } from "../hooks/token";
import { INavigationParamList } from "../models/navigationModel";
import { IUserModel } from "../models/userModel";
import { useHttp } from "../hooks/useHttp";
import Layout from "../components/Layout";

type ProfileScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Profile"
>;

export default function ProfileScreenView({
  navigation,
}: ProfileScreenViewPropsTypes) {
  const [openModal, setOpenModal] = useState(false);
  const { init, setInit } = useAppContext();
  const { removeToken } = useAuthToken();

  const { handleGetRequest } = useHttp();
  const [detailProfile, setDetailProfile] = useState<IUserModel>();

  const handleLogOut = async () => {
    await removeToken();
    setInit({
      ...init,
      isAuth: true,
    });
  };

  const getMyProfile = async () => {
    const result = await handleGetRequest({
      path: "/my-profile",
    });

    console.log(result);
    setDetailProfile(result);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  return (
    <Layout>
      <ScrollView>
        <VStack space={5} p={4}>
          {/* Profile Header */}
          <VStack space={2} alignItems="center">
            <Avatar
              bg={BASE_COLOR.primary}
              size="xl"
              source={{
                uri: "https://vasundharaodisha.org/upload/84552no-user.jpg",
              }}
            >
              <Box
                position="absolute"
                bottom={0}
                right={0}
                bg="blue.500"
                borderRadius="full"
                p={1.5}
              >
                <FontAwesome name="check" size={12} color="white" />
              </Box>
            </Avatar>
            <Text
              fontSize="xl"
              fontWeight="bold"
              color={BASE_COLOR.text.primary}
            >
              {detailProfile?.userName || "Guest User"}
            </Text>
            <HStack space={1} alignItems="center">
              <Ionicons name="ios-calendar-outline" size={16} color="gray" />
              <Text fontSize="sm" color="gray.500">
                Join Date: 4/5/2024
              </Text>
            </HStack>
          </VStack>

          {/* Activity Section */}
          <VStack space={3}>
            <CardProfileList onPress={() => {}}>
              <Ionicons
                name="heart-outline"
                size={24}
                color={BASE_COLOR.text.primary}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                flex={1}
                color={BASE_COLOR.text.primary}
              >
                Daily Routine
              </Text>
              <Ionicons name="chevron-forward" size={20} color="gray.500" />
            </CardProfileList>

            <CardProfileList onPress={() => {}}>
              <Ionicons
                name="cart-outline"
                size={24}
                color={BASE_COLOR.text.primary}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                flex={1}
                color={BASE_COLOR.text.primary}
              >
                Your Cart
              </Text>
              <Badge colorScheme="danger" rounded="full" ml={2}>
                3
              </Badge>
              <Ionicons name="chevron-forward" size={20} color="gray.500" />
            </CardProfileList>

            <CardProfileList onPress={() => {}}>
              <Ionicons
                name="list-outline"
                size={24}
                color={BASE_COLOR.text.primary}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                flex={1}
                color={BASE_COLOR.text.primary}
              >
                Your Orders
              </Text>
              <Badge colorScheme="danger" rounded="full" ml={2}>
                1
              </Badge>
              <Ionicons name="chevron-forward" size={20} color="gray.500" />
            </CardProfileList>
          </VStack>

          {/* Preferences Section */}
          <VStack space={3} mt={4}>
            <CardProfileList onPress={() => {}}>
              <Ionicons
                name="person-outline"
                size={24}
                color={BASE_COLOR.text.primary}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                flex={1}
                color={BASE_COLOR.text.primary}
              >
                Edit Username
              </Text>
              <Ionicons name="chevron-forward" size={20} color="gray.500" />
            </CardProfileList>

            <CardProfileList onPress={() => {}}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={BASE_COLOR.text.primary}
              />
              <Text
                fontSize="md"
                fontWeight="bold"
                flex={1}
                color={BASE_COLOR.text.primary}
              >
                Notification
              </Text>
              <Switch defaultIsChecked size="md" colorScheme="primary" />
            </CardProfileList>
          </VStack>

          {/* Logout Button */}
          <Box mt={4} alignItems="center">
            <Button
              onPress={() => setOpenModal(true)}
              colorScheme="blue"
              width="90%"
              rounded="lg"
              _text={{ fontWeight: "bold", fontSize: "md" }}
            >
              Sign Out
            </Button>
          </Box>

          {/* Modal for Logout Confirmation */}
          <ModalPrimary
            openModel={openModal}
            onCloseModal={setOpenModal}
            modalHeaderTitle="Logout"
            modalText="Are you sure you want to logout?"
            btnNoTitle="Cancel"
            btnYesTitle="Logout"
            onBtnYesClick={handleLogOut}
          />
        </VStack>
      </ScrollView>
    </Layout>
  );
}

type CardProfileListTypes = {
  onPress: (value: any) => void;
  children: ReactNode;
};

const CardProfileList = ({ children, onPress }: CardProfileListTypes) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <HStack
        bg="white"
        p={4}
        alignItems="center"
        space={3}
        rounded="lg"
        shadow={1}
        borderWidth={1}
        borderColor="coolGray.200"
      >
        {children}
      </HStack>
    </TouchableOpacity>
  );
};
