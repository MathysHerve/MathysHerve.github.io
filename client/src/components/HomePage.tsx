import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const HomePage = () => {
  return (
    <Container>
        <Row className="justify-content-center">
            <Col xs="auto">
                <h1 style={{paddingTop: 350, paddingBottom: 350}}>Hi, I'm Mathys</h1>
            </Col>
        </Row>
        <Row>
            <Col xs="auto">
                <h2 className="mb-3">Personal Projects</h2>
            </Col>
        </Row>
        <Row className="g-5 ">
            <Col xs="auto">
                <Card style={{ width: '18rem' }}>
                    <Card.Img className='mx-auto my-2 w-75' variant="top" src="public/react.svg" />
                    <Card.Body>
                        <Card.Title>Personal Website</Card.Title>
                        <Card.Text>
                            Created a React project using Vite + React + Flask.
                        </Card.Text>
                        <Button variant="primary">See the Website</Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs="auto">
                <Card style={{ width: '18rem' }}>
                    <Card.Img className='mx-auto my-2 w-75' variant="top" src="public/react.svg" />
                    <Card.Body>
                        <Card.Title>Three.js</Card.Title>
                        <Card.Text>
                            Made interactive 3D frontend with Three.js
                        </Card.Text>
                        <Button variant="primary" href='/three'>Go to 3D Stuff</Button>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
    </Container>

  )
}

export default HomePage