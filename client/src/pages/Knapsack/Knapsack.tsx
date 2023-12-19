import React, { useContext } from 'react'
import Canvas from '../../components/Canvas'
import Annotation from '../../components/Annotation'
import { DarkModeContext } from '../../DarkModeContext'
import TextArea from '../../components/TextArea'

const Knapsack = () => {
   const {darkMode} = useContext(DarkModeContext);

  return (
    <div className={`${darkMode ? 'dark' : 'light'}`}>
        <Canvas label="intro">
            <TextArea customClass='intro-algorithm' centered={true}>
                Test Text area that is trying to explain something
            </TextArea>
            <Annotation>
                <span>span that is quite  long and should hopefully make the thing do the thigns what do yo think i want there to be like what the fuck </span>
            </Annotation>
            <Annotation>
                test 2
            </Annotation>
        </Canvas>
    </div>
  )
}

export default Knapsack