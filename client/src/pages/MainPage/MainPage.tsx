import React, { useContext, useState } from 'react'
import Title from './Title'
import Card from '../../components/Card'
import CardContainer from '../../components/CardContainer'

import Page from './Page'

type Props = {}


const MainPage = (props: Props) => {

  return (
    <Page>
        <Title text="Hi, I'm Mathys" customClass='intro-text text-center'/>
        <CardContainer customClass='project-cards' title="Personal Projects">
            <Card 
                title="React-Flask Personal Website" 
                description="To learn full-stack development, I made a website! Click on the link below to see it." 
                link="" linktext="See the Website" 
                imageUrl='public/react.svg'
            />
            
        </CardContainer>
        <CardContainer customClass='blog-cards' title="Blogs">

        </CardContainer>
    </Page>
  )
}

export default MainPage