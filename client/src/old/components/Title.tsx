import React from 'react'

interface Prop {
  text: string;
  customClass? : string;
}

const Title = ({text, customClass}: Prop) => {
  const characters = text.split("");

  return (
    <div className={customClass}>
      {characters.map((char, index) => (
        <span className="fadeable-char" key={index}>{char}</span>
      )
      )}
    </div>
  )
}

export default Title