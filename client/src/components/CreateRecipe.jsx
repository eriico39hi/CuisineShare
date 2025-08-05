import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import myImage from '../assets/image-not-found.jpg'
import InputGroup from 'react-bootstrap/InputGroup'
import Buffer from 'buffer'


function CreateRecipe() {
  
  const navigate = useNavigate()
  const URL = "http://localhost:3000/api/newrecipe"

  const [name, setName] = useState("")
  const [time, setTime] = useState(0)
  const [description, setDescription] = useState("")

  const[fileBuffer, setFileBuffer] = useState(null)
  const[fileName, setFileName] = useState('')
  const[fileType, setFileType] = useState('')
  const[fileString, setFileString] = useState('')


  const onCancel = async (event) => {
        navigate(-1)
  }

  const handleInstructions = (eInstr) =>{
    const abc = null
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setFileName(file.name)
      setFileType(file.type)
      
      //put logic here to verify that filetype is an image
      const freader = new FileReader()
      freader.readAsDataURL(file)
      
      freader.onload = function(){
        console.log(freader.result)
        setFileString(freader.result)
      }
      
      console.log(file)
      
    }
    
  }


  const onSubmit = async (event) =>{

    const image = fileString //not actually sure if this is going to work
    event.preventDefault();

    const test = JSON.stringify({name,time,image,description})
    console.log(test)
    /*
    try{
      let response = await fetch(URL,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({name,time,image,description,ingredients,steps})
      })
    }
    */

  } 

  return (<>

    

    <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
      <Container>
        <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" >
                <Nav.Link className="text-black" href="/Home">Home</Nav.Link>
                <Nav.Link className="text-black" href="/BrowseRecipes">All Recipes</Nav.Link>
                <Nav.Link className="text-black" href="/CreateRecipe">Add Recipe</Nav.Link>
            </Nav>
        </Navbar.Collapse>            
      </Container>
    </Navbar>
    <Container className = "mt-3">
      <Row>
        <Col>
        <Image src={myImage} fluid />
        </Col>
        <Col>
          <Form >
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control 
                type="text" 
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter Recipe Name"/>
            </Form.Group>
              <Form.Group className="mb-3" controlId="duration">
                  <Form.Label>Est. Time (min.)</Form.Label>
              <Form.Control 
                type="number" 
                value={time}
                onChange={(e)=>setTime(e.target.value)}
                placeholder="Enter Recipe Time"/>
            </Form.Group>
              <Form.Group className="mb-3" controlId="info">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea"
                rows={4} 
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Enter Recipe Name"/>
            </Form.Group>
          </Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Recipe Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange}/>
          </Form.Group>   
        </Col>
      </Row>
      <hr/>
      <Form >
        <Form.Group className="mb-3" controlId="formGridIngred1">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control 
            type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridIngred2">
          <Form.Control 
            type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridIngred3">
        
          <Form.Control 
            type="text" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridIngred4">
          <Form.Control 
            type="text" />
        </Form.Group>
      </Form>   
      <Form.Label>Instruction Steps</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Instructions go here"
          aria-describedby="basic-addon1"
          onChange={handleInstructions}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Button variant="outline-secondary" id="button-addon1">
          Add Step
        </Button>
        <Form.Control
          aria-label="Instructions go here"
          aria-describedby="basic-addon1"
          onChange={handleInstructions}
        />
      </InputGroup>

      <Button className="mt-3 mx-4" variant="primary" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="mt-3" variant="primary" type="button" onClick={onSubmit}>
        Submit
      </Button>   
    </Container> 
        <hr/> 
  

    </>);
    
}

export default CreateRecipe;