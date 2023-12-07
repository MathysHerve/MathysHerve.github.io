import React from 'react'
import './MainPage.scss'
import Title from './Title'
import Card from '../Card'
import CardContainer from '../CardContainer'

type Props = {}

const MainPage = (props: Props) => {
  return (
    <>
        <Title />
        <CardContainer title="Personal Projects">
            <Card 
                title="Test Project" 
                description="This is a project i did at some point" 
                link="https://www.google.com" linktext="Google" 
                imageUrl='public/images/tree.jpg'
            />
        </CardContainer>
        <CardContainer title="Blogs">

        </CardContainer>

    </>
  )
}

export default MainPage