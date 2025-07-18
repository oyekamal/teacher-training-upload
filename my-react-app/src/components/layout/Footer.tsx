import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

const AppFooter: React.FC = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      My React App ©{new Date().getFullYear()} Created by Me
    </Footer>
  )
}

export default AppFooter
