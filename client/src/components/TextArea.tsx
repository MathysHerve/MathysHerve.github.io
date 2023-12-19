import React, { ReactNode, useContext } from 'react'
import { DarkModeContext } from '../DarkModeContext';

interface Props {
    children?: ReactNode;
    customClass?: string;
    centered?: boolean;
}



const TextArea = ({children, customClass, centered}: Props) => {
    const darkMode = useContext(DarkModeContext);


  return (
    <div className={`${customClass} ${darkMode ? 'dark' : ''} ${centered ? 'centered-container' : ''}`}>
        {children}
    </div>
  )
}

export default TextArea