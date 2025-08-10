/*
*   Footer.jsx
*
*   Holds the Footer shown on each page, collected here to save space on each page
*   Dynamically changes depending on if the user is logged in, as verified by the existence of a JWT token
*/

import { Container, Nav, Col, Row, } from 'react-bootstrap';

function Footer () {

    const token = localStorage.getItem("token")
    let navItems1 = [];
    let navItems2 = [];

    if(token!=null) {
        navItems1 = [
            { label: 'All Recipes', path: '/BrowseRecipes' },
            { label: 'Add Recipe', path: '/CreateRecipe' }
        ]; 
        navItems2 = [
            { label: 'My Recipes', path: '/MyRecipes' },
            { label: 'Favorites', path: '/MyRecipes' }
        ];       
    }
    else {
         navItems1 = [
            { label: 'All Recipes', path: '/BrowseRecipes' },
        ];     
    }

 
    return (
            
        <div className="mt-auto" style={{ backgroundColor: '#74cbe0ff' }}>
            <Container className="text-black">
                <Row className = "p-4">
                    <Col className="mx-5 mt-4">
                        <h4>CuisineShare</h4>
                    </Col>
                    <Col className="mt-3">
                        <h5>Recipes</h5>
                        <Nav className="flex-column">
                            {navItems1.map((item,index) => (
                                <Nav.Link key={index}  href={item.path}>
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Col>
                     <Col className="mt-3">
                        {token &&
                            <h5>Account</h5>
                        }
                        <Nav className="flex-column">
                            {navItems2.map((item,index) => (
                                <Nav.Link  key={index}  href={item.path}>
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                    </Col>
                    <Col className="mt-2">
                    <h4>Contact Us!</h4>
                    <p>SandwichLover143@Cuisineshare.com</p>
                    <p>Phone: +1(800)COOKIES</p> 
                    <p>Phone: +1(800)266-5437</p> 
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Footer;