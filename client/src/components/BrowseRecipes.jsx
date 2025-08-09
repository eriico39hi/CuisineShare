/*
*   BrowseRecipes.jsx
*
*   Page that allows you to browse all recipes stored in database by picture, title and author
*   Has the additional feature of being able to favorite a recipe if you're logged in
*/

import { useState, useRef, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from "react-bootstrap/esm/Spinner";
import NavBar from './NavBar.jsx';
import RecipeCard from './RecipeCard.jsx';

function BrowseRecipes() {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchedAll, setFetchedAll] = useState(false)
  const [offset, setOffset] = useState(0)
  const isFetching = useRef(false)

  const baseURL = "http://localhost:3000/api/allrecipes"


  
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
            <RecipeCard recipe={recipe}/>
          </Col>
        ))}
      </Row>
    </Container>
    </>)}
</>)}

export default BrowseRecipes;