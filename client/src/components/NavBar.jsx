import { useState, useEffect } from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavBar() {

    let navItems = [];

    const test = true;
    if(test) {
        navItems = [
            { label: 'Home', path: '/' },
            { label: 'All Recipes', path: '/BrowseRecipes' },
            { label: 'Add Recipe', path: '/CreateRecipe' },
            { label: 'My Recipes', path: '/MyRecipes' },
    ]; }
    else {
        navItems = [
            { label: 'Home', path: '/' },
            { label: 'All Recipes', path: '/BrowseRecipes' },
            { label: 'Login', path: '/Login' }];
    }

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
            <Container>
                <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" >
                        {navItems.map((item,index) => (
                            <Nav.Link className="text-black"  key={index} href={item.path}>
                            {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>                            
            </Container>
        </Navbar>
    )
}
export default NavBar;