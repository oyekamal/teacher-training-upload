import React from 'react'
import { Button as AntButton } from 'antd'
import { ButtonProps } from 'antd/lib/button'

interface CustomButtonProps extends ButtonProps {
  // Add any custom props here
}

const Button: React.FC<CustomButtonProps> = (props) => {
  return <AntButton {...props} />
}

export default Button
