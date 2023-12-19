import React, { useContext } from 'react'
import { DarkModeContext, DarkModeDispatchContext } from '../DarkModeContext'
import ToggleButton from './ToggleButton'
import { Link, Outlet } from 'react-router-dom';




const Navbar = () => {
  const {darkMode} = useContext(DarkModeContext)
  const setDarkMode = useContext(DarkModeDispatchContext)

  const toggleDarkMode = () => {
    if (setDarkMode) {
      setDarkMode({type: "TOGGLE_DARK_MODE"});
    }
  }

  return (
    <>
        <nav className={`navbar sticky-top navbar-expand-lg bg-${darkMode ? 'dark' : 'light'}`}  data-bs-theme={darkMode ? 'dark' : 'light'}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Algorithms
                          </a>
                          <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/algorithms/knapsack">Knapsack</Link></li>
                          </ul>
                        </li>
                    </ul>
                    <ToggleButton defaultState={darkMode} onToggle={toggleDarkMode} text='Dark Mode'/>
                </div>
            </div>
        </nav>
        <Outlet />
    </>
  )
}

export default Navbar