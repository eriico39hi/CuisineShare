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
import { useEffect } from "react";

function RecipeInfo() {

    const URL = "http://localhost:3000/api/viewrecipe"
    const [recipeInfo, setRecipeInfo] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        const loadRecipe = async (URL)=>{
            try{
                const response = await fetch(URL)
                const data = await response.json()
                setRecipeInfo(JSON.parse(data.recipeData))
                console.log(recipeInfo)
            }
            catch(err){console.log(err)}
            finally{setLoading(false)}
        }
        loadRecipe(URL)
    }
)

//need to make an image decode function and stick the image into "myImage"


return (<Container>   
    {loading?(
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>):
        (     
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
    <Container className = "mt-5">
        <Row>
            <Col>
            <Image src={myImage} fluid />
            </Col>
            <Col>
            <Card className = "border border-dark">
                <Card.Title className="fs-4 fw-bold">{recipeInfo.name}</Card.Title>
                <Card.Subtitle>Uploaded: by Mr Potato Head</Card.Subtitle>
                <Card.Body className = "border"></Card.Body>
                <Card.Text className="mx-4">
                    Est. Time: {recipeInfo.time}<br/>
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
)}
    </Container>);
}

export default RecipeInfo;