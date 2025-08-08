/*
*   BrowseRecipes.jsx
*
*   Page that allows you to browse all recipes stored in database by picture, title and author
*   Has the additional feature of being able to favorite a recipe if you're logged in
*/

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Spinner from "react-bootstrap/esm/Spinner";
import { jwtDecode } from "jwt-decode"
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar.jsx';

function BrowseRecipes() {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchedAll, setFetchedAll] = useState(false)
  const [offset, setOffset] = useState(0)
  const isFetching = useRef(false)
  const navigate = useNavigate()

  const baseURL = "http://localhost:3000/api/allrecipes"
  const faveURL = "http://localhost:3000/api/addfavorite"

  //This use effect function is for populating the recipe cards
  //Repeatedly sends get request to endpoint with new offset
  //If the response is '404 no more recipes' loop will exit
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
  
  //this useEffect can be helpful to log stuff after loading is complete
  //was used extensively during development troubleshooting to observe variables
  //now that code is mostly working it could be removed
  useEffect(()=>{
    console.log(loading)
  },[loading])

  //this function is used to add a new favorite to a user
  //it triggers when the small Favorite button at the bottom of the card is clicked
  //it sends a POST request to the endpoint which appends the new recipe to the users favorites array (in MongoDB)
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

  //The return page elements themselves. All bootstrap.
  //The cards are dynamically added inside a loop for each recipe in the recipes array using recipes.map
  return (<>
  {loading?(
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>):
    (<>
      <NavBar/>
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