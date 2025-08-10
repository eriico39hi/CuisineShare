/*
*   RecipeInfo.jsx
*
*   Page that shows detailed recipe info so you can make the recipe.
*/

import { Container, ListGroup, Col, Row, Card, Image, Spinner } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import './Style.css';

function RecipeInfo() {

    const baseURL = "http://localhost:3000/api/view/"
    const [recipeInfo, setRecipeInfo] = useState()
    const [loading, setLoading] = useState(true)
    const {recipeID} = useParams()

    //This useEffect function loads the recipe itself
    //The URL includes the recipe ID which is parsed out at the backend to retrieve the correct information
    useEffect(()=>{

        console.log(baseURL+recipeID)
        const loadRecipe = async ()=>{
            try{
                const response = await fetch(baseURL+recipeID)
                const data = await response.json()
                setRecipeInfo(JSON.parse(data.recipeData))
                
            }
            catch(err){console.log(err)}
            finally{
                setLoading(false)
            }

        }
        loadRecipe()
    },[])

    //this useEffect can be helpful to log stuff after loading is complete
    //was used extensively during development troubleshooting to observe variables
    //now that code is mostly working it could be removed
    useEffect(()=>{
        console.log(loading)
        console.log(recipeInfo)
        console.log(recipeID)
    },[loading])

    //The return page elements themselves. All bootstrap.
    return ( <>
        {loading?(
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
             </Container>):
            (<div className="d-flex flex-column min-vh-100">   
            <NavBar/>
            <Container className="flex-grow-1 mt-5" >
                <Row>
                    <Col>
                    <Image src={recipeInfo.image} fluid width="90%"/>
                    </Col>
                    <Col>
                    <Card className = "border border-dark">
                        <Card.Title className="fs-1 fw-bold">{recipeInfo.name}</Card.Title>
                        <Card.Subtitle>Uploaded: {recipeInfo.author}</Card.Subtitle>
                        <Card.Body className = "border"></Card.Body>
                        <Card.Text className="mx-2">
                            Est. Time: {recipeInfo.time}<br/>
                            Rating <br/>
                            <br/><br/>
                            <u>Description</u><br/>
                            {recipeInfo.description}
                            <br/><br/>
                        </Card.Text>
                        </Card>
                    </Col>
                </Row>  
                <hr className="line"/> 
                <Row>
                <div className="my-1">
                    <h2>Ingredients</h2>
                </div>
                    <ListGroup numbered className="py-0">
                        {recipeInfo.ingredients.map((item,index) => (
                        <ListGroup.Item className="py-0" key={index}>
                            {item}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Row>
                 <hr className="line"/> 
                <Row>
                    <div className="my-1">
                        <h2>Instructions</h2>
                    </div>
                    <ListGroup  numbered>
                        {recipeInfo.instructions.map((item,index) => (
                        <ListGroup.Item className="py-0" key={index} >
                            {item}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Row>
            <hr className="line"/> 
            </Container>
            <br/><br/><br/><br/><br/>
            <Footer/>
        </div>)}  
    </>)     
}

export default RecipeInfo;