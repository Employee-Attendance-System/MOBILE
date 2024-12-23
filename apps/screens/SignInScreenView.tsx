import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Box,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Pressable,
  ScrollView,
  Select,
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
import { IUserCreateRequestModel } from "../models/userModel";
import { ISupplierModel } from "../models/supplierModel";

type SignUpScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "SignUp"
>;

export default function SignUpScreenView({
  navigation,
}: SignUpScreenViewPropsTypes) {
  const { handlePostRequest, handleGetRequest } = useHttp();
  const deviceId = useDeviceId();

  const [suppliers, setSuppliers] = useState<ISupplierModel[]>([]);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [supplierIdSelected, setSupplierIdSelected] = useState<number>();

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
      if (userName === "") {
        inputName = "userName";
        throw Error("nama tidak boleh kosong!");
      }

      if (phoneNumber === "") {
        inputName = "userPhoneNumber";
        throw Error("nomor WA tidak boleh kosong!");
      }

      if (userName.length < 5 || userName.length > 15) {
        inputName = "userName";
        throw Error("panjang nama min 5 - 15 karakter !");
      }

      if (password === "") {
        inputName = "password";
        throw Error("password tidak boleh kosong!");
      }

      if (password.length < 6) {
        inputName = "password";
        throw Error("gunakan password minimal 6 karakter!");
      }

      if (deviceId === null) {
        throw Error("Device Id Tidak Ditemukan!");
      }

      if (supplierIdSelected === null) {
        throw Error("Supplier Tidak Ditemukan!");
      }

      const payload: IUserCreateRequestModel = {
        userSupplierId: supplierIdSelected!,
        userName: userName,
        userPassword: password,
        userContact: phoneNumber,
        userDeviceId: deviceId,
        userRole: "spg",
      };

      await handlePostRequest({
        path: "/users/register",
        body: payload,
      });

      navigation.navigate("Login");
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

  const getSuppliers = async () => {
    try {
      setIsLoading(true);
      const result = await handleGetRequest({
        path: "/suppliers",
      });
      if (result) {
        setSuppliers(result.items);
        console.log(result);
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <Layout pt={8}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>

        <VStack space={1} mt="5">
          <FormControl>
            <FormControl.Label>User Nama</FormControl.Label>
            <Input
              isInvalid={errorInput.isError && errorInput.inputName === "name"}
              onChangeText={handleSetUserName}
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
            <FormControl.Label>Supplier</FormControl.Label>
            <Select
              selectedValue={supplierIdSelected + ""}
              minWidth="200"
              accessibilityLabel="Pilih Supplier"
              placeholder="pilih supplier"
              onValueChange={(itemValue) =>
                setSupplierIdSelected(Number(itemValue))
              }
              _selectedItem={{
                bg: "blue.200",
                endIcon: <CheckIcon size="5" />,
              }}
            >
              {suppliers.map((item) => (
                <Select.Item
                  key={item.id}
                  label={item.userName}
                  value={item.userId.toString()}
                />
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormControl.Label>Nomor WA</FormControl.Label>
            <Input
              isInvalid={
                errorInput.isError && errorInput.inputName === "userPhoneNumber"
              }
              onChangeText={handleSetUserPhoneNumber}
              placeholder="08232223333"
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
              {isLoading ? "Submit..." : "Sign Up"}
            </Text>
          </Pressable>

          <HStack mt="6" space="2" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Sudah Punya Akun?
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Link>
          </HStack>
        </VStack>
      </ScrollView>
    </Layout>
  );
}
