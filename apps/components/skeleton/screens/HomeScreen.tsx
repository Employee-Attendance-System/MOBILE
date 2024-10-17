import { HStack, Skeleton } from 'native-base'
import Layout from '../../Layout'
import CardSkeleton from '../CardProductSkeleton'
import { widthPercentage } from '../../../utilities/dimension'

export default function HomeSceenSkeleton() {
  return (
    <Layout>
      <Skeleton h='32' width={widthPercentage(100)} px='2' my='2' rounded='md' />

      <HStack flexWrap={'wrap'} space={2}>
        {[1, 2, 3, 4, 5].map((item) => (
          <CardSkeleton key={item} />
        ))}
      </HStack>
    </Layout>
  )
}
