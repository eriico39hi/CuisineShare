import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card'


function BrowseRecipes() {
   return (<>
        
    

    <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
      <Container>
        <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
        <p> Browse Recipes Under Construction</p>

    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src="/src/assets/Sandwich.jpg" />
      <Card.Body>
        <Card.Title>Sandwich</Card.Title>
        <Card.Text>
          Delicious Sandwich Recipe
        </Card.Text>
      </Card.Body>
    </Card>



    </>);
    
}

export default BrowseRecipes;