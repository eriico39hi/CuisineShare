
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Welcome.css';



function Welcome() {

    const navigate = useNavigate()

    const login = async (event) => {
        navigate("/Login")
    }
     const viewRecipe = async (event) => {
        navigate("/BrowseRecipes")
    }
        
     const addRecipe = async (event) => {
        navigate("/CreateRecipe")
    }

    return (
        <div className = "welcome-page">
            <Navbar expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto" >
                            <Nav.Link className="text-white" href="/Home">Home</Nav.Link>
                            <Nav.Link className="text-white" href="/BrowseRecipes">All Recipes</Nav.Link>
                            <Button type="button" onClick={login}>Login</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className = "container d-flex justify-content-center align-items-center mt-5">
                <Card className="text-center bg-transparent">
                    <Card.Header className="card-title text-white mt-5">CuisineShare</Card.Header>
                    <Card.Title className="card-title text-white">Get inspired for your next meal.</Card.Title>
                    <Card.Body>
                    <Container>
                        <Button className="mx-3" variant="primary" type="button" onClick={viewRecipe}>
                            View Recipes
                        </Button>
                        <Button variant="primary" type="button" onClick={addRecipe}>
                            Add Recipes
                        </Button>
                    </Container>
                    </Card.Body>
                </Card>
                </Container>
        </div>
    );
    
}

export default Welcome;