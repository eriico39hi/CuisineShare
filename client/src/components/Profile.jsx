import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import myImage from '../assets/image-not-found.jpg'




function Profile() {

    const navigate = useNavigate()
  
    const addRecipe = async (event) => {
        navigate("/CreateRecipe")
    }

    return(<>
        <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
            <Container>
                <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
        </Navbar>
        <Container>
            <div className="my-4 border-bottom">
             <h1> Welcome, Insert Name Here!</h1>
            </div>
        </Container>
        <Container className="d-flex justify-content-end">
            
            <Button variant="primary" type="button" onClick={addRecipe}>
                Add New Recipe
            </Button>
        </Container>    
        <Container>
            <div className="my-4 border-bottom">
                <h2>My Recipes</h2>
            </div>
        </Container>            
        <Container>
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
        </Container>  
        <hr/> 
        <Container>
            <div className="my-4 border-bottom">
                <h2>Favorited Recipes</h2>
            </div>
        </Container>            
        <Container>
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
        </Container>  
    </>);
}

export default Profile;