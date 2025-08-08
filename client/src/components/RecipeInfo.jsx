import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Image from 'react-bootstrap/Image';
import myImage from '../assets/image-not-found.jpg'
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams } from "react-router-dom";
import NavBar from './NavBar.jsx';

function RecipeInfo() {

    const baseURL = "http://localhost:3000/api/view/"
    const [recipeInfo, setRecipeInfo] = useState()
    const [loading, setLoading] = useState(true)
    const {recipeID} = useParams()


    
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

    useEffect(()=>{
        //this useEffect can be helpful to log stuff after loading is complete
        console.log(loading)
        console.log(recipeInfo)
        console.log(recipeID)
    },[loading])



    return ( <>
        {loading?(
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>):
            (<>   
            <NavBar/>
            <Container className = "mt-5">
                <Row>
                    <Col>
                    <Image src={recipeInfo.image} fluid width="90%"/>
                    </Col>
                    <Col>
                    <Card className = "border border-dark">
                        <Card.Title className="fs-1 fw-bold">{recipeInfo.name}</Card.Title>
                        <Card.Subtitle>Uploaded: {recipeInfo.author}</Card.Subtitle>
                        <Card.Body className = "border"></Card.Body>
                        <Card.Text className="mx-4">
                            Est. Time: {recipeInfo.time}<br/>
                            Rating <br/>
                            <br/><br/>
                            <u>{recipeInfo.description}</u><br/>
                            <br/><br/>
                        </Card.Text>
                        </Card>
                    </Col>
                </Row>  
                <hr/> 
                
                <Row>
                <div className="my-1">
                    <h2>Ingredients</h2>
                </div>
                    <ListGroup className="py-0">
                        {recipeInfo.ingredients.map((item,index) => (
                        <ListGroup.Item className="py-0" key={index}>
                            {item}
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Row>
                 <hr/> 
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
            <hr/> 
            </Container>
        </>)}  
    </>)
        
}

export default RecipeInfo;