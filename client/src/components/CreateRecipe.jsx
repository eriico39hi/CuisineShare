import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import myImage from '../assets/image-not-found.jpg'



function CreateRecipe() {
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
    <Container className = "mt-3">
      <Row>
        <Col>
        <Image src={myImage} fluid />
        </Col>
        <Col>
          <Form >
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control 
                type="text" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="duration">
                  <Form.Label>Est. Time (min.)</Form.Label>
              <Form.Control 
                type="text" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="info">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea"
                rows={4} />
            </Form.Group>
          </Form>
          <Button className="mt-3" variant="primary" type="button">
              Upload Picture
          </Button>   
        </Col>
      </Row>
      <hr/>
      <Form >
        <Form.Group className="mb-3" controlId="formGridIngred1">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control 
            type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridIngred2">
          <Form.Control 
            type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridIngred3">
        
          <Form.Control 
            type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridIngred4">
          <Form.Control 
            type="text" />
        </Form.Group>
      </Form>   
      <Form >
            <Form.Group className="mb-3" controlId="formGridInst1">
              <Form.Label>Ingredients</Form.Label>
              <Form.Control 
                type="text" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formGridInst2">
              <Form.Control 
                type="text" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formGridInst3">
            
              <Form.Control 
                type="text" />
            </Form.Group>
              <Form.Group className="mb-3" controlId="formGridInst4">
              <Form.Control 
                type="text" />
            </Form.Group>
      </Form>
      <Button className="mt-3 mx-4" variant="primary" type="button">
        Cancel
      </Button>
      <Button className="mt-3" variant="primary" type="button">
        Submit
      </Button>   
    </Container> 
        <hr/> 
  

    </>);
    
}

export default CreateRecipe;