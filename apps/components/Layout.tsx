import { View } from 'native-base'
import React, { PropsWithChildren } from 'react'

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <View flex={1} backgroundColor={'gray.100'}>
      {children}
    </View>
  )
}

export default Layout
