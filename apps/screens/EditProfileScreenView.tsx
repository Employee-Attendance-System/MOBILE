import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Pressable,
  ScrollView,
  Text,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { BASE_COLOR } from "../utilities/baseColor";
import { MaterialIcons } from "@expo/vector-icons";
import { INavigationParamList } from "../models/navigationModel";
import { useHttp } from "../hooks/useHttp";
import { appConfig } from "../configs";
import useDeviceId from "../hooks/useDeviceId";
import {
  IUserCreateRequestModel,
  IUserUpdateRequestModel,
} from "../models/userModel";

type EditProfileScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "EditProfile"
>;

export default function EditProfileScreenView({
  navigation,
  route,
}: EditProfileScreenViewPropsTypes) {
  const { handleUpdateRequest } = useHttp();
  const deviceId = useDeviceId();
  const detailUser = route.params.user;

  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorInput, setErrorInput] = useState({
    inputName: "",
    isError: false,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSetUserName = (input: string) => {
    setUserName(input);
    setErrorInput({ inputName: "", isError: false, message: "" });
  };

  const handleSetUserPhoneNumber = (input: string) => {
    setPhoneNumber(input);
    setErrorInput({ inputName: "", isError: false, message: "" });
  };

  const handleSetPassword = (input: string) => {
    setPassword(input);
    setErrorInput({ inputName: "", isError: false, message: "" });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let inputName = "default";
    try {
      const payload: IUserUpdateRequestModel = {
        userName: userName,
        userPassword: password,
        userContact: phoneNumber,
        userRole: "spg",
      };

      await handleUpdateRequest({
        path: "/users/spg",
        body: payload,
      });

      navigation.goBack();
    } catch (error: any) {
      console.log(error);
      setErrorInput({
        inputName: inputName,
        isError: true,
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setUserName(detailUser?.userName);
    setPhoneNumber(detailUser?.userContact);
    console.log(detailUser);
  }, []);

  return (
    <Layout pt={8}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space={1} mt="5">
          <FormControl>
            <FormControl.Label>User Nama</FormControl.Label>
            <Input
              isInvalid={errorInput.isError && errorInput.inputName === "name"}
              onChangeText={handleSetUserName}
              value={userName}
              placeholder="nama"
              bgColor="#FFF"
              _focus={{
                bg: BASE_COLOR.blue[100],
                borderColor: BASE_COLOR.primary,
              }}
            />
            <FormControl.ErrorMessage
              isInvalid={
                errorInput.isError && errorInput.inputName === "userName"
              }
              leftIcon={<WarningOutlineIcon size="xs" />}
              _text={{
                fontSize: "xs",
              }}
            >
              {errorInput.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.Label>Nomor WA</FormControl.Label>
            <Input
              isInvalid={
                errorInput.isError && errorInput.inputName === "userPhoneNumber"
              }
              onChangeText={handleSetUserPhoneNumber}
              placeholder="08232223333"
              value={phoneNumber}
              bgColor="#FFF"
              _focus={{
                bg: BASE_COLOR.blue[100],
                borderColor: BASE_COLOR.primary,
              }}
            />
            <FormControl.ErrorMessage
              isInvalid={
                errorInput.isError && errorInput.inputName === "userPhoneNumber"
              }
              leftIcon={<WarningOutlineIcon size="xs" />}
              _text={{
                fontSize: "xs",
              }}
            >
              {errorInput.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              onChangeText={handleSetPassword}
              isInvalid={
                errorInput.isError && errorInput.inputName === "password"
              }
              type={showPassword ? "text" : "password"}
              bgColor="#FFF"
              _focus={{
                bg: BASE_COLOR.blue[100],
                borderColor: BASE_COLOR.primary,
              }}
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
            />
            <FormControl.ErrorMessage
              isInvalid={
                errorInput.isError && errorInput.inputName === "password"
              }
              leftIcon={<WarningOutlineIcon size="xs" />}
              _text={{
                fontSize: "xs",
              }}
            >
              {errorInput.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.ErrorMessage
              isInvalid={
                errorInput.isError && errorInput.inputName === "default"
              }
              leftIcon={<WarningOutlineIcon size="xs" />}
              _text={{
                fontSize: "xs",
              }}
            >
              {errorInput.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <Pressable
            onPress={handleSubmit}
            disabled={isLoading}
            bg={appConfig.colors.primary}
            p="2"
            mt="5"
            rounded="xl"
          >
            <Text textAlign="center" fontSize="xl" color="#FFF">
              {isLoading ? "Loading..." : "Save"}
            </Text>
          </Pressable>
        </VStack>
      </ScrollView>
    </Layout>
  );
}
