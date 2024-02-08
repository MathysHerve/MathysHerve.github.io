import React, { ReactNode, useContext } from 'react'
import { DarkModeContext } from '../DarkModeContext'

interface Props {
    children: ReactNode;
}

const Page = ({children} : Props) => {
  const {darkMode} = useContext(DarkModeContext);

  return (
    <div className='container-fluid'>
        <div className={"row page " + (darkMode ? 'dark' : '')}>
            {children}
        </div>
    </div>
  )
}

export default Page