import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import myImage from '../assets/image-not-found.jpg'
import Spinner from "react-bootstrap/esm/Spinner";
import { jwtDecode } from "jwt-decode"
import Button from 'react-bootstrap/Button';



function BrowseRecipes() {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchedAll, setFetchedAll] = useState(false)
  const [offset, setOffset] = useState(0)
  const isFetching = useRef(false)
  const navigate = useNavigate()



  const baseURL = "http://localhost:3000/api/allrecipes"
  const faveURL = "http://localhost:3000/api/addfavorite"
 
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'All Recipes', path: '/BrowseRecipes' },
    { label: 'Add Recipe', path: '/CreateRecipe' },
    { label: 'My Recipes', path: '/MyRecipes' },
  ];

  useEffect(()=>{    
    if (fetchedAll || isFetching.current) return
    if (offset !== recipes.length) return

    const getRecipes = async ()=>{

      isFetching.current = true
      try{
        console.log(offset)
        const res = await fetch(`${baseURL}?offset=${offset}`)
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
        setRecipes(prevRecipes => [...prevRecipes, data])
        setOffset(prevOffset => prevOffset + 1)
      }
      catch(err){console.log(err)}
      finally {
        isFetching.current = false
      }
    }

    getRecipes()
  },[offset,fetchedAll,recipes.length])
  
  useEffect(()=>{
    //this useEffect can be helpful to log stuff after loading is complete
    console.log(loading)
  },[loading])

  const onFavorite = async(e,recipeID)=>{

    e.stopPropagation()

    let userID
    const token = localStorage.getItem("token")
    console.log(token)
    if(token && token != "undefined"){
        userID = jwtDecode(token).id
    }
    console.log(userID)
    console.log(recipeID)
    console.log(faveURL)
    try{
      let response = await fetch(faveURL,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({userID,recipeID})
      })
      await response.json()

    }catch(err){console.log(err)}

 
    console.log("fave clicked")

    
  }


   return (<>
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
      <div className="my-4 pb-2 border-bottom">
        <h1>Browse Recipes</h1>
      </div>
    </Container>
    
    <Container className="mt-5">
    <Row>
      {recipes.map((recipe, index) => (
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
            </Card.Text>
            <Button variant="danger" size="sm" onClick={(e) => onFavorite(e,recipe._id)}>
              Favorite
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
  
  </>)}
</>)}

export default BrowseRecipes;