import React, { useLayoutEffect, useState } from "react";
import {
  VStack,
  Input,
  FormControl,
  Button,
  Select,
  CheckIcon,
  TextArea,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { INavigationParamList } from "../../models/navigationModel";
import Layout from "../../components/Layout";

type CreateJadwalScreenViewPropsTypes = NativeStackScreenProps<
  INavigationParamList,
  "CreateJadwal"
>;

export default function CreateJadwalScreenView({
  navigation,
}: CreateJadwalScreenViewPropsTypes) {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [toko, setToko] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleCreateTask = () => {
    // Handle create task logic here
    console.log({ taskName, dueDate, toko, status });
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Create Jadwal",
    });
  }, []);

  return (
    <Layout>
      <VStack safeArea p={5} space={6} bg="gray.50" flex={1}>
        <FormControl>
          <FormControl.Label>Nama Pekerjaan</FormControl.Label>
          <Input
            placeholder="Enter task name"
            value={taskName}
            onChangeText={(text) => setTaskName(text)}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Hari dan Tgl</FormControl.Label>
          <Input
            placeholder="YYYY-MM-DD"
            value={dueDate}
            onChangeText={(text) => setDueDate(text)}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Waktu Mulai</FormControl.Label>
          <Input
            placeholder="YYYY-MM-DD"
            value={dueDate}
            onChangeText={(text) => setDueDate(text)}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Waktu Selesai</FormControl.Label>
          <Input
            placeholder="YYYY-MM-DD"
            value={dueDate}
            onChangeText={(text) => setDueDate(text)}
          />
        </FormControl>

        <FormControl>
          <FormControl.Label>Toko</FormControl.Label>
          <Select
            selectedValue={toko}
            minWidth="200"
            accessibilityLabel="Choose toko"
            placeholder="Choose toko"
            onValueChange={(itemValue) => setToko(itemValue)}
            _selectedItem={{
              bg: "blue.200",
              endIcon: <CheckIcon size="5" />,
            }}
          >
            <Select.Item label="54324 (Toko A)" value="54324" />
            <Select.Item label="44334 (Toko B)" value="44334" />
            <Select.Item label="34533 (Toko C)" value="34533" />
          </Select>
        </FormControl>

        <Button
          onPress={handleCreateTask}
          bg="blue.500"
          _text={{ color: "white" }}
        >
          Simpan
        </Button>
      </VStack>
    </Layout>
  );
}
