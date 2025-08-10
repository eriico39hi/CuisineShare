/*
*   BrowseRecipes.jsx
*
*   Page that allows you to browse all recipes stored in database by picture, title and author
*   Has the additional feature of being able to favorite a recipe if you're logged in (this function is actually contained in "RecipeCard" now but called to this page)
*/

import { useState, useRef, useEffect } from "react";
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import RecipeCard from './RecipeCard.jsx';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function BrowseRecipes() {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchedAll, setFetchedAll] = useState(false)
  const [offset, setOffset] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const isFetching = useRef(false)
  const [toastMsg, setToastMsg] = useState("")

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

  const handleFavoriteSuccess = (recipeName) => {
    setToastMsg("Favorite Success!")
    setShowToast(true)
  }

  const handleFavoriteError = () => {
    setToastMsg("Favorite failed!")
    setShowToast(true)
  }


  //The return page elements themselves. All bootstrap.
  //The cards are dynamically added inside a loop for each recipe in the recipes array using recipes.map
  return (<>
  
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999, position: "fixed", top: 10, right: 10 }}>
      <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={4000} 
          autohide>
          <Toast.Header>
          <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
          />
          <strong className="me-auto">{toastMsg}</strong>
          </Toast.Header>
      </Toast>
  </ToastContainer>

    {loading?(
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>):
      (<div className="page-background d-flex flex-column min-vh-100">
        <NavBar/>
        <Container className="flex-grow-1 mt-3" >
          <div className="my-4 pb-2 border-bottom">
            <h1>Browse Recipes</h1>
          </div>
          <Row> 
            {recipes.map((recipe, index) => (
              <Col md={4} key={index} className="mb-4">
              <RecipeCard 
                recipe={recipe}
                onFavoriteSuccess={handleFavoriteSuccess}
                onFavoriteError={handleFavoriteError}
                />
            </Col>
            ))}
         </Row>
    </Container>
    <br/><br/><br/><br/><br/>
    <Footer/>
    </div>)}
</>)}

export default BrowseRecipes;