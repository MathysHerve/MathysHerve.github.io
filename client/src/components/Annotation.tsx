import React, { ReactNode } from 'react'

interface Props { 
    children: ReactNode;
}

const Annotation = ({children}: Props) => {

  return (
    <div className="annotation-container">
        <div className="annotation-card">
            {children}
        </div>
    </div>
  )
}

export default Annotation