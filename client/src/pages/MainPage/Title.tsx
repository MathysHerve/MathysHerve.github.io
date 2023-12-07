import React from 'react'

interface Prop {
  customClass? : string;
}

const Title = ({customClass}: Prop) => {
  return (
    <h1 className={customClass}>Hi, I'm Mathys</h1>
  )
}

export default Title