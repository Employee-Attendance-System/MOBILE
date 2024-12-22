import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Avatar,
  HStack,
  Text,
  VStack,
  Box,
  Button,
  ScrollView,
  Divider,
  Icon,
} from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, ImageBackground } from "react-native";
import { BASE_COLOR } from "../utilities/baseColor";
import ModalPrimary from "../components/Modal/ModalPrimary";
import { useAppContext } from "../context/app.context";
import { useAuthToken } from "../hooks/token";
import { INavigationParamList } from "../models/navigationModel";
import { IUserModel } from "../models/userModel";
import { useHttp } from "../hooks/useHttp";
import Layout from "../components/Layout";
import { convertISOToRegular } from "../utilities/convertTime";
import { useFocusEffect } from "@react-navigation/native";

type ProfileScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "Profile"
>;

export default function ProfileScreenView({
  navigation,
}: ProfileScreenViewPropsTypes) {
  const { setAppAlert } = useAppContext();
  const [openModal, setOpenModal] = useState(false);
  const { init, setInit } = useAppContext();
  const { removeToken } = useAuthToken();
  const { handleGetRequest } = useHttp();
  const [detailProfile, setDetailProfile] = useState<IUserModel>();

  const handleLogOut = async () => {
    await removeToken();
    setInit({ ...init, isAuth: false });
  };

  const getMyProfile = async () => {
    const result = await handleGetRequest({ path: "/my-profile" });
    setDetailProfile(result);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getMyProfile();
    }, [])
  );

  return (
    <Layout>
      <ScrollView>
        <Box>
          <VStack alignItems={"center"} bgColor={"white"} p={5}>
            <Box px={4} pb={2}>
              <Avatar
                size="xl"
                source={{
                  uri: "https://vasundharaodisha.org/upload/84552no-user.jpg",
                }}
                borderColor="white"
                borderWidth={3}
              />
            </Box>

            <Text fontSize="2xl" fontWeight="bold">
              @{detailProfile?.userName || "Guest User"}
            </Text>

            <Text fontSize="sm" color="gray.500">
              {detailProfile?.userContact || "_"}
            </Text>

            <HStack space={3} mt={1}>
              <HStack alignItems="center">
                <Ionicons name="calendar-outline" size={16} color="gray" />
                <Text fontSize="sm" color="gray.500" ml={1}>
                  Joined{" "}
                  {convertISOToRegular(detailProfile?.createdAt + "") || "N/A"}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Divider
          <Divider mt={5} /> */}

          {/* Profile Options */}
          <VStack px={4} space={5} mt={2} bgColor={"white"} p={5}>
            <ProfileOption
              icon="person-outline"
              label="Edit Profile"
              onPress={() =>
                navigation.navigate("EditProfile", { user: detailProfile! })
              }
            />

            <ProfileOption
              icon="help-circle-outline"
              label="Help Center"
              // onPress={() => navigation.navigate("Help")}
              onPress={() => {}}
            />
          </VStack>

          {/* Logout Button */}
          <Box mt={8} px={4}>
            <Button
              onPress={() => setOpenModal(true)}
              colorScheme="blue"
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
        </Box>
      </ScrollView>
    </Layout>
  );
}

type ProfileOptionProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

const ProfileOption = ({ icon, label, onPress }: ProfileOptionProps) => (
  <TouchableOpacity onPress={onPress}>
    <HStack space={3} alignItems="center">
      <Icon as={Ionicons} name={icon} size="lg" color="gray.500" />
      <Text fontSize="md" fontWeight="medium">
        {label}
      </Text>
    </HStack>
  </TouchableOpacity>
);
