import React from 'react'
import { Layout } from 'antd'

const { Header } = Layout

const AppHeader: React.FC = () => {
  return (
    <Header style={{ background: '#fff', padding: 0 }}>
      <h1 style={{ textAlign: 'center' }}>My React App</h1>
    </Header>
  )
}

export default AppHeader
