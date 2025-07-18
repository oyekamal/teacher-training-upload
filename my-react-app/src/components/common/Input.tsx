import React from 'react'
import { Input as AntInput } from 'antd'
import { InputProps } from 'antd/lib/input'

interface CustomInputProps extends InputProps {
  // Add any custom props here
}

const Input: React.FC<CustomInputProps> = (props) => {
  return <AntInput {...props} />
}

export default Input
