import React, { useContext } from 'react'
import { DarkModeContext } from '../pages/MainPage/DarkmodeContext'
import ToggleButton from './ToggleButton'

interface Props {
    onToggle: () => void;
}

const Navbar = ({onToggle} : Props) => {
  const darkMode = useContext(DarkModeContext)

  return (
    <nav className={`navbar sticky-top navbar-expand-lg navbar-${darkMode ? 'dark' : 'light'} bg-${darkMode ? 'dark' : 'light'}`}>
        <div className='container-fluid'>
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#">Home </a>
                </div>

            </div>
            <ToggleButton customClass="main-nav-bar" text="Dark Mode" onToggle={onToggle}/>
        </div>
    </nav>
  )
}

export default Navbar