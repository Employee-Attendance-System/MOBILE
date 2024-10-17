import { HStack, Skeleton } from 'native-base'
import Layout from '../../Layout'
import CardSkeleton from '../CardProductSkeleton'
import { widthPercentage } from '../../../utilities/dimension'

export default function ProductSceenSkeleton() {
  return (
    <Layout>
      <Skeleton width={widthPercentage(100)} px='2' my='2' rounded='md' />
      <HStack space={1}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Skeleton key={item} width={widthPercentage(20)} px='2' my='2' rounded='xl' />
        ))}
      </HStack>
      <HStack flexWrap={'wrap'} space={2}>
        {[1, 2, 3, 4, 5].map((item) => (
          <CardSkeleton key={item} />
        ))}
      </HStack>
    </Layout>
  )
}
