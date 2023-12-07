import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
    onButtonPress: () => void;
}
const Button = ({children, onButtonPress} : Props) => {
  return (
    <button className='btn btn-primary' onClick={onButtonPress}>{children}</button>
  )
}

export default Button