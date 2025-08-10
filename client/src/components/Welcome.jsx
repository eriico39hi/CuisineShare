/*
*   Welcome.jsx
*
*   Home page of the site. Has a fancy image background but basically just navigates to other parts of the site
*/

import { Container, Navbar, Nav, Card, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Style.css';



function Welcome() {

    const token = localStorage.getItem("token")
    console.log(token)
    const navigate = useNavigate()

    //These functions all just navigate to various other pages
    //If "AddRecipes" is clicked and the user isn't logged in it brings them to the login page
    const login = async (event) => {
        navigate("/Login")
    }

     const logout = async (event) => {
        localStorage.removeItem("token");
        navigate("/")
    }

     const viewRecipe = async (event) => {
        navigate("/BrowseRecipes")
    }  
    const addRecipe = async (event) => {
        if(token != null){
            navigate("/CreateRecipe")
        } else {
            navigate("/Login")
        }
    }

    //The return page elements themselves. All bootstrap.
    return (
        <div className = "welcome-page">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto" >
                            <Nav.Link className="text-white" href="/Home">Home</Nav.Link>
                            <Nav.Link className="text-white" href="/BrowseRecipes">All Recipes</Nav.Link>
                            {(token===null) &&
                                <Button type="button" variant="primary" onClick={login}>Login</Button>
                            }
                            {token &&
                            <Button variant="primary" type="button" onClick={logout}>
                                Log Out
                            </Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className = "container d-flex justify-content-center align-items-center mt-5">
                <Card className="text-center bg-transparent">
                    <Card.Header className="welcome-title text-white mt-5">CuisineShare</Card.Header>
                    <Card.Title className="welcome-title text-white mb-3 ">Get inspired for your next meal.</Card.Title>
                    <Card.Body>
                        <Container>
                            <Button className="mx-3" variant="primary" type="button" onClick={viewRecipe}>
                                View Recipes
                            </Button>
                            {token &&
                                <Button variant="primary" type="button" onClick={addRecipe}>
                                    Add Recipes
                                </Button>
                            }
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
    
}

export default Welcome;