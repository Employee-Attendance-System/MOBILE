import {
  AspectRatio,
  Box,
  Center,
  HStack,
  Heading,
  Stack,
  Image,
  Text
} from 'native-base'
import { toMoney } from '../../utilities/toMony'
import { widthPercentage } from '../../utilities/dimension'
import { BASE_COLOR } from '../../utilities/baseColor'
import { useEffect, useState } from 'react'

interface IProductCardModel {
  title: string
  description: string
  images: string
  price: number
  discount: number
  totalSale: number
}

export function ProductCardComponent(props: IProductCardModel) {
  const [image, setImage] = useState(undefined)

  useEffect(() => {
    const convertImageToArray = JSON.parse(props.images)
    setImage(convertImageToArray[0])
  }, [props])

  return (
    <Box
      width={widthPercentage(47.5)}
      rounded='lg'
      overflow='hidden'
      m={1}
      borderColor='coolGray.200'
      borderWidth='1'
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700'
      }}
      _web={{
        shadow: 2,
        borderWidth: 0
      }}
      _light={{
        backgroundColor: 'white'
      }}
    >
      <Box>
        <AspectRatio w='100%' ratio={16 / 9}>
          <Image
            source={{
              uri: image
            }}
            alt='image'
          />
        </AspectRatio>
        {props.discount > 0 && (
          <Center
            bg={BASE_COLOR.red}
            _dark={{
              bg: 'violet.400'
            }}
            position='absolute'
            bottom='0'
            px='3'
            py='0.5'
          >
            <Text color='warmGray.50'>DISC {props.discount + ''}%</Text>
          </Center>
        )}
      </Box>
      <Stack p='2' space={1}>
        <Stack space={2}>
          <Heading size='md' ml='-1'>
            {props.title}
          </Heading>
          <Text
            fontSize='xs'
            _light={{
              color: 'violet.500'
            }}
            _dark={{
              color: 'violet.400'
            }}
            fontWeight='500'
            ml='-0.5'
            mt='-1'
          >
            Terjual {props.totalSale}
          </Text>
        </Stack>

        <HStack alignItems='center' space={4} justifyContent='space-between'>
          <HStack alignItems='center'>
            <Text
              color={BASE_COLOR.orange}
              _dark={{
                color: 'warmGray.200'
              }}
              fontWeight='400'
            >
              Rp{toMoney(props.price)}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  )
}
