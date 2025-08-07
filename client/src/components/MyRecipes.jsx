import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import myImage from '../assets/image-not-found.jpg'
import { jwtDecode } from "jwt-decode"
import { useRef } from "react";
import { useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";

function MyRecipes() {

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'All Recipes', path: '/BrowseRecipes' },
        { label: 'Add Recipe', path: '/CreateRecipe' },
        { label: 'My Recipes', path: '/MyRecipes' },
    ];

    const baseURL = "http://localhost:3000/api/myrecipes"

    const [myRecipes, setMyRecipes] = useState([])
    const username = jwtDecode(localStorage.getItem("token")).user
    const [loading, setLoading] = useState(true)
    const [fetchedAll, setFetchedAll] = useState(false)
    const [offset, setOffset] = useState(0)
    const isFetching = useRef(false)
    const navigate = useNavigate()
  
    const addRecipe = async (event) => {
        navigate("/CreateRecipe")
    }

    const logout = async () => {
        localStorage.removeItem("token")
        navigate("/")
    }


    useEffect(()=>{    
        if (fetchedAll || isFetching.current) return
        if (offset !== myRecipes.length) return

        const getMyRecipes = async ()=>{

            isFetching.current = true
            try{
                console.log(offset)
                const res = await fetch(`${baseURL}?offset=${offset}&user=${username}`)
                if (res.status === 404){
                    setFetchedAll(true)
                    setLoading(false)
                    return
                }
                const data = await res.json()
                if(!data){
                    setFetchedAll(true)
                    return
                }
                setMyRecipes(prevRecipes => [...prevRecipes, data])
                setOffset(prevOffset => prevOffset + 1)
            }
            catch(err){
                console.log(err)
            } finally {
                isFetching.current = false
            }
        }

        getMyRecipes()
    },[offset,fetchedAll,myRecipes.length])


    return(<>
    {loading?(
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>):
      (<>

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
        <Container>
            <div className="my-4 border-bottom">
             <h1> Welcome, {username}</h1>
            </div>
        </Container>
        <Container className="d-flex justify-content-end">
            
            <Button variant="primary" type="button" onClick={addRecipe}>
                Add New Recipe
            </Button>
            &nbsp;
            <Button variant="primary" type="button" onClick={logout}>
                Logout
            </Button>
        </Container>    
        <Container>
            <div className="my-4 border-bottom">
                <h2>My Recipes</h2>
            </div>
        </Container>

        <Container className="mt-5">
            <Row>
                {myRecipes.map((recipe, index) => (
                <Col md={4} key={index} className="mb-4">
                    <Card 
                        className="border border-dark border-1 h-100"
                        style={{cursor:'pointer'}}
                        onClick={()=>navigate(`/View/${recipe._id}`)}
                        role="button"
                        >
                        <Card.Header>
                            <Image
                            src={recipe.image} fluid
                            />
                        </Card.Header>
                        <Card.Body>
                            <Card.Title className="fs-4 mt-2 fw-bold">
                                {recipe.name || 'Unnamed Recipe'}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Uploaded by: {recipe.author || 'Unknown'}
                            </Card.Subtitle>
                            <Card.Text>
                                Est. Time: {recipe.time || 'N/A'} <br />
                                Rating: {recipe.rating}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                ))}
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
    </>)}
</>)}

export default MyRecipes;