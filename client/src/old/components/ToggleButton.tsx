import React, { useContext, useState } from 'react'
import { DarkModeContext } from '../DarkModeContext';

interface Props {
    onToggle: () => void;
    text?: string;
    customClass?: string;
    defaultState?: boolean;
}

const ToggleButton = ({onToggle, text, customClass, defaultState} : Props) => {
    const [isToggled, setToggled] = useState(defaultState);
    const {darkMode} = useContext(DarkModeContext)
  
    const handleToggle = () => {
      setToggled(!isToggled);
      onToggle();
    };
  
    return (
        <div className={`toggle-div ${customClass ? customClass : ''}`}>
            {text && <span className={`toggle-text ${darkMode ? `dark` : ''}`}>{text}</span>}
            <div className={`toggle-container ${darkMode ? 'dark' : ''} ${isToggled ? 'active' : ''}`}>
                <button className={`toggle-button ${darkMode ? 'dark' : ''}`} onClick={handleToggle}>
                <div className="slider" />
                </button>
            </div>
        </div>
    );
  };

export default ToggleButton