import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Layout } from 'antd'
import AppHeader from './components/layout/Header'
import AppFooter from './components/layout/Footer'
import Sidebar from './components/layout/Sidebar'
const Home = React.lazy(() => import('./pages/Home'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const UserProfile = React.lazy(() => import('./pages/UserProfile'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const { Content } = Layout

const App: React.FC = () => {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <AppHeader />
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 360 }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/profile' element={<UserProfile />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </Router>
  )
}

export default App
