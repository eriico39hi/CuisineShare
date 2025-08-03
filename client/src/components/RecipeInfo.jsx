import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import myImage from '../assets/image-not-found.jpg'

function RecipeInfo() {
    return (<>
        
        <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
        <Container>
            <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto" >
                    <Nav.Link className="text-black" href="/Home">Home</Nav.Link>
                    <Nav.Link className="text-black" href="/BrowseRecipes">All Recipes</Nav.Link>
                    <Nav.Link className="text-black" href="/CreateRecipe">Add Recipe</Nav.Link>
                </Nav>
            </Navbar.Collapse>            
        </Container>
        </Navbar>
        <Container>
            <Row>
                <Col>
                <Image src={myImage} roundedCircle fluid />
                </Col>
                <Col>
                <Card className = "border border-dark">
                    <Card.Title className="fs-4 fw-bold">Loaded Baked Potato</Card.Title>
                    <Card.Subtitle>Uploaded: by Mr Potato Head</Card.Subtitle>
                    <Card.Body className = "border"></Card.Body>
                    <Card.Text className="mx-4">
                        Est. Time: <br/>
                        Rating <br/>
                        <br/><br/>
                        <u>Info Goes Here</u><br/>
                        <br/><br/>
                    </Card.Text>
                    </Card>
                </Col>
          </Row>  
            <hr/> 
          <Row>
            <p>Add ingredient list here
                        1 <br/>
                        2<br/>
                        3<br/>
                        4<br/>
                        5<br/><br/>
                    </p>
          </Row>
            <Row>
            <p>Add instructions here
                        1 <br/>
                        2<br/>
                        3<br/>
                        4<br/>
                        5<br/><br/>
                    </p>
          </Row>
        <hr/> 
        </Container>
     

        
    
    </>);
}

export default RecipeInfo;