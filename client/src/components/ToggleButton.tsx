import React, { useContext, useState } from 'react'
import { DarkModeContext } from '../pages/MainPage/DarkmodeContext';

interface Props {
    onToggle: () => void;
    text?: string;
    customClass?: string;
}

const ToggleButton = ({onToggle, text, customClass} : Props) => {
    const [isToggled, setToggled] = useState(false);
    const darkMode = useContext(DarkModeContext)
  
    const handleToggle = () => {
      setToggled(!isToggled);
      onToggle();
    };
  
    return (
        <div className={`toggle-div ${customClass}`}>
            {text && <p className={`toggle-text ${darkMode ? `dark-mode` : ''}`}>{text}</p>}
            <div className={`toggle-container ${darkMode ? 'dark-mode' : ''} ${isToggled ? 'active' : ''}`}>
                <button className={`toggle-button ${darkMode ? 'dark-mode' : ''}`} onClick={handleToggle}>
                <div className="slider" />
                </button>
            </div>
        </div>
    );
  };

export default ToggleButton