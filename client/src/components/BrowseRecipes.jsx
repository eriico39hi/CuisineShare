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


function BrowseRecipes() {

  

  

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
      <div className="my-4 pb-2 border-bottom">
        <h1>Browse Recipes</h1>
      </div>
    </Container>

    {/*

    <Container className = "mt-5">
      <Row>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
      </Row>  
        <br/> 
       <Row>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
      </Row>  
      <br/>
       <Row>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className = "border border-dark  border-1 ">
            <Card.Header>
              <Image src={myImage} fluid />
            </Card.Header>
            <Card.Title className="fs-4 mt-2 mx-4 fw-bold">Recipe Title</Card.Title>
            <Card.Subtitle className="mx-4">Uploaded by: insert name</Card.Subtitle>
            <Card.Body className = "border"></Card.Body>
            <Card.Text className="mx-4">
                Est. Time: <br/>
                Rating <br/>
                <br/><br/>
            </Card.Text>
          </Card>
        </Col>
      </Row>  
    <hr/> 
    </Container>

    */}
  
  </>);  
}

export default BrowseRecipes;