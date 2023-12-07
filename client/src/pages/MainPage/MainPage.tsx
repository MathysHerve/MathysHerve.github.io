import React, { useState } from 'react'
import Title from './Title'
import Card from '../../components/Card'
import CardContainer from '../../components/CardContainer'
import ToggleButton from '../../components/ToggleButton'
import { DarkModeContext } from './DarkmodeContext'
import Navbar from '../../components/Navbar'

type Props = {}


const MainPage = (props: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  

  return (
    <DarkModeContext.Provider value={darkMode}>
      <div className='container-fluid'>
        <div className='row'>
            <Navbar onToggle={toggleDarkMode}/>
        </div>
        <div className={"row main-page " + (darkMode ? 'dark-mode' : '')}>

          <Title customClass='intro-text text-center'/>
          <CardContainer customClass='project-cards' title="Personal Projects">
              <Card 
                  title="React-Flask Personal Website" 
                  description="To learn full-stack development, I made a website! Click on the link below to see it." 
                  link="" linktext="See the Website" 
                  imageUrl='public/react.svg'
                  customImageClass='card-padding-small'
              />
          </CardContainer>
          <CardContainer customClass='blog-cards' title="Blogs">

          </CardContainer>

        </div>
      </div>
    </DarkModeContext.Provider>

  )
}

export default MainPage