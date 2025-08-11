/*
*   RecipeInfo.jsx
*
*   Page that shows detailed recipe info so you can make the recipe.
*/

import { Container, ListGroup, Col, Row, Card, Image, Spinner, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import './Style.css';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { jwtDecode } from "jwt-decode"

function RecipeInfo() {

    const baseURL = "http://localhost:3000/api/view/"
    const faveURL = "http://localhost:3000/api/addfavorite"

    const [recipeInfo, setRecipeInfo] = useState()
    const [loading, setLoading] = useState(true)
    const {recipeID} = useParams()
    const [showToast, setShowToast] = useState(false)
    const [toastMsg, setToastMsg] = useState("")

    const token = localStorage.getItem("token");

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

    const onFavorite = async(e,recipeID)=>{
    
        e.stopPropagation()

        let userID
        
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
        setToastMsg("Favorite Successful!")
        setShowToast(true)
        }catch(err){
            console.log(err)
            setToastMsg("Favorite Un-Successful...")
            setShowToast(true)
        }
        console.log("fave clicked")
    }

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
            (
                       
            <div className="d-flex flex-column min-vh-100">   
            <NavBar/>
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
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
            <Container className="flex-grow-1 mt-5" >
                <Row>
                    <Col>
                    <Image src={recipeInfo.image} fluid width="90%"/>
                    
                    </Col>
                    <Col>
                    <Card className = "border border-dark">

                        <Row>
                            <Col>
                                <Card.Title className="fs-1 fw-bold">{recipeInfo.name}</Card.Title>
                            </Col>
                            <Col>
                            {token && 
                                <Button variant="danger" size="sm" onClick={(e) => onFavorite(e,recipeID)}>
                                Favorite
                                </Button>
                            }
                            </Col>
                        </Row>

                        <Card.Subtitle>Uploaded: {recipeInfo.author}</Card.Subtitle>
                        <Card.Body className = "border"></Card.Body>
                        <Card.Text className="mx-2">
                            Est. Time: {recipeInfo.time}<br/>
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