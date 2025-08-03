import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function RecipeInfo() {
    return (<>
        
        <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
        <Container>
            <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
        </Navbar>
        <p>Recipe Info Under Construction</p>
    </>);
}

export default RecipeInfo;