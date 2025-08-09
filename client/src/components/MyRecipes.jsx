/*
*   MyRecipes.jsx
*
*   Page that allows you view your recipes. Effectively a user profile.
*   Displays cards for recipes you've made and your favorite recipes, keyed off the JWT token in localStorage.
*/

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { jwtDecode } from "jwt-decode"
import Spinner from "react-bootstrap/esm/Spinner";
import NavBar from './NavBar.jsx';

function MyRecipes() {

    const baseURL = "http://localhost:3000/api/myrecipes"
    const fbaseURL = "http://localhost:3000/api/favrecipes"

    const [myRecipes, setMyRecipes] = useState([])
    const [favRecipes, setFavRecipes] = useState([])
    const username = jwtDecode(localStorage.getItem("token")).user
    const [loading, setLoading] = useState(true)
    const [loadingF, setLoadingF] = useState(true)
    const [fetchedAll, setFetchedAll] = useState(false)
    const [fetchedAllF, setFetchedAllF] = useState(false)
    const [offset, setOffset] = useState(0)
    const [foffset, setFOffset] = useState(0)
    const isFetching = useRef(false)
    const isFetchingF = useRef(false)
    const navigate = useNavigate()
  
    //Fires with add recipe button click. Navigates to the page for adding a recipe.
    const addRecipe = async (event) => {
        navigate("/CreateRecipe")
    }

    //This is one of 2 nearly identical useEffect functions
    //This one fetches all recipes that the user has created
    //It is based off the same function for AllRecipes in the BrowseRecipes.jsx
    //It repeatedly asks for a recipe from an endpoint, in this case the "myrecipes" endpoint
    //That endpoint is similar to the allrecipes one, but only returns recipes where the user in the URL query field matches 
    //the author on the recipe
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


    //This is one of 2 nearly identical useEffect functions
    //This one fetches all recipes that the user has favorited
    //It is based off the same function for AllRecipes in the BrowseRecipes.jsx
    //It repeatedly asks for a recipe from an endpoint, in this case the "favrecipes" endpoint
    //That endpoint then fetches the array of favorites of the logged in user, then returns a recipe 
    //from that array based on offset in the query
    useEffect(()=>{    
        if (fetchedAllF || isFetchingF.current) return
        if (foffset !== favRecipes.length) return

        const getFavRecipes = async ()=>{

            isFetchingF.current = true
            try{
                console.log(foffset)
                const res = await fetch(`${fbaseURL}?offset=${foffset}&user=${username}`)
                if (res.status === 404){
                    setFetchedAllF(true)
                    setLoadingF(false)
                    return
                }
                const data = await res.json()
                if(!data){
                    setFetchedAllF(true)
                    return
                }
                setFavRecipes(prevRecipes => [...prevRecipes, data])
                setFOffset(prevOffset => prevOffset + 1)
            }
            catch(err){
                console.log(err)
            } finally {
                isFetchingF.current = false
            }
        }

        getFavRecipes()
    },[foffset,fetchedAllF,favRecipes.length])

    //The return page elements themselves. All bootstrap.
    //The card mapping was borrowed from BrowseRecipes
    return(<>
    {(loading&&loadingF)?(
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>):
      (<>
        <NavBar/>
        <Container>
            <div className="my-4 border-bottom">
             <h1> Welcome, {username}</h1>
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
        <Container className="mt-5">
            <Row>
                {myRecipes.map((recipe, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card 
                            className="border border-dark border-1 h-100"
                            style={{cursor:'pointer'}}
                            onClick={()=>navigate(`/View/${recipe._id}`)}
                            role="button">
                            <Card.Header>
                                <Image src={recipe.image} fluid/>
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
        <Container className="mt-5">
            <Row>
                {favRecipes.map((recipe, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card 
                            className="border border-dark border-1 h-100"
                            style={{cursor:'pointer'}}
                            onClick={()=>navigate(`/View/${recipe._id}`)}
                            role="button">
                            <Card.Header>
                                <Image src={recipe.image} fluid/>
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
    </>)}
</>)}

export default MyRecipes;