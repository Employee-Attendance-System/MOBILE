import { Skeleton } from 'native-base'
import Layout from '../../Layout'
import { widthPercentage } from '../../../utilities/dimension'

export default function ProductDetailSceenSkeleton() {
  return (
    <Layout>
      <Skeleton h='56' width={widthPercentage(100)} px='2' my='2' rounded='md' />
      <Skeleton h='32' width={widthPercentage(100)} px='2' my='2' rounded='md' />
      <Skeleton px='2' my='2' rounded='md' />
      <Skeleton.Text px='2' />
      <Skeleton.Text px='2' my={5} />
    </Layout>
  )
}
