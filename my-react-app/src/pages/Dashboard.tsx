import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../services/userService'
import { User } from '../types/user'
import { Table, Alert } from 'antd'

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
  ]

  if (isLoading) return <div>Loading...</div>
  if (error)
    return <Alert message='Error fetching data' type='error' showIcon />

  return (
    <div>
      <h1>User Dashboard</h1>
      <Table dataSource={data} columns={columns} rowKey='id' />
    </div>
  )
}

export default Dashboard
