import React from 'react'
import { Card as AntCard } from 'antd'
import { CardProps } from 'antd/lib/card'

interface CustomCardProps extends CardProps {
  // Add any custom props here
}

const Card: React.FC<CustomCardProps> = (props)_ => {
  return <AntCard {...props} />
}

export default Card
