import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  Box,
  FormControl,
  HStack,
  Heading,
  Icon,
  Input,
  Link,
  Pressable,
  Text,
  VStack,
  WarningOutlineIcon
} from 'native-base'
import { useLayoutEffect, useState } from 'react'
import Layout from '../components/Layout'
import { BASE_COLOR } from '../utilities/baseColor'
import { MaterialIcons } from '@expo/vector-icons'
import { useHttp } from '../hooks/useHttp'
import { IUserLoginRequestModel } from '../models/userModel'
import { useAuthToken } from '../hooks/token'
import { useAppContext } from '../context/app.context'
import { INavigationParamList } from '../models/navigationModel'
import { appConfig } from '../configs'

type LoginScreenViewPropsTypes = NativeStackScreenProps<INavigationParamList, 'Login'>

export default function LoginScreenView({ navigation }: LoginScreenViewPropsTypes) {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showuserPassword, setShowuserPassword] = useState(false)
  const [errorInput, setErrorInput] = useState({
    inputName: '',
    isError: false,
    message: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const { handlePostRequest } = useHttp()
  const { setToken } = useAuthToken()
  const { init, setInit } = useAppContext()

  const handleSetUserName = (input: string) => {
    setUserName(input)
    setErrorInput({ inputName: '', isError: false, message: '' })
  }

  const handleSetUserPassword = (input: string) => {
    setUserPassword(input)
    setErrorInput({ inputName: '', isError: false, message: '' })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    let inputName = 'default'
    try {
      if (userName === '') {
        inputName = 'userName'
        throw Error('nama userName tidak boleh kosong!')
      }

      if (userPassword === '') {
        inputName = 'userPassword'
        throw Error('userPassword tidak boleh kosong!')
      }

      const payload: IUserLoginRequestModel = {
        userName,
        userPassword
      }

      const result = await handlePostRequest({
        path: '/users/login',
        body: payload
      })

      if (result) {
        await setToken(result.data.token)
        setInit({
          ...init,
          isAuth: true
        })
      }
    } catch (error: any) {
      setErrorInput({ inputName: inputName, isError: true, message: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: ''
    })
  }, [])

  return (
    <Layout>
      <Box safeArea p='2' py='8'>
        <Heading
          size='lg'
          fontWeight='600'
          color='coolGray.800'
          _dark={{
            color: 'warmGray.50'
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt='1'
          _dark={{
            color: 'warmGray.200'
          }}
          color='coolGray.600'
          fontWeight='medium'
          size='xs'
        >
          Login to continue!
        </Heading>

        <VStack space={3} mt='5'>
          <FormControl>
            <FormControl.Label>User Name</FormControl.Label>
            <Input
              isInvalid={errorInput.isError && errorInput.inputName === 'userName'}
              onChangeText={handleSetUserName}
              bgColor='#FFF'
              placeholder='User Name'
              _focus={{ bg: BASE_COLOR.blue[100], borderColor: BASE_COLOR.primary }}
            />
            <FormControl.ErrorMessage
              isInvalid={errorInput.isError && errorInput.inputName === 'userName'}
              leftIcon={<WarningOutlineIcon size='xs' />}
              _text={{
                fontSize: 'xs'
              }}
            >
              {errorInput.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <FormControl.Label>password</FormControl.Label>
            <Input
              onChangeText={handleSetUserPassword}
              isInvalid={errorInput.isError && errorInput.inputName === 'userPassword'}
              type={showuserPassword ? 'text' : 'password'}
              bgColor='#FFF'
              _focus={{ bg: BASE_COLOR.blue[100], borderColor: BASE_COLOR.primary }}
              InputRightElement={
                <Pressable onPress={() => setShowuserPassword(!showuserPassword)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showuserPassword ? 'visibility' : 'visibility-off'}
                      />
                    }
                    size={5}
                    mr='2'
                    color='muted.400'
                  />
                </Pressable>
              }
              placeholder='password'
            />
            <FormControl.ErrorMessage
              isInvalid={errorInput.isError && errorInput.inputName === 'userPassword'}
              leftIcon={<WarningOutlineIcon size='xs' />}
              _text={{
                fontSize: 'xs'
              }}
            >
              {errorInput.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <FormControl>
            <FormControl.ErrorMessage
              isInvalid={errorInput.isError && errorInput.inputName === 'default'}
              leftIcon={<WarningOutlineIcon size='xs' />}
              _text={{
                fontSize: 'xs'
              }}
            >
              {errorInput.message}
            </FormControl.ErrorMessage>
          </FormControl>

          <Pressable
            onPress={handleSubmit}
            disabled={isLoading}
            bg={appConfig.colors.primary}
            p='2'
            rounded='xl'
          >
            <Text textAlign='center' fontSize='xl' color='#FFF'>
              {isLoading ? 'Login...' : 'Login'}
            </Text>
          </Pressable>
        </VStack>
      </Box>
    </Layout>
  )
}
