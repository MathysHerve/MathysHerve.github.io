import React, { Children, ReactNode } from 'react'

interface Props { 
    label: string;
    children?: ReactNode;
}

const Canvas = ({label, children} : Props) => {
  return (
    <div className={`canvas canvas-${label}`}>
        {children}
    </div>
  )
}

export default Canvas