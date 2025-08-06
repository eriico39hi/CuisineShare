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
  const [ingredients, setIngredients] = useState([{id: 0,ingredient: "",}])
  const [instructions, setInstructions] = useState([{id: 0,instruction: "",}])

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

   const handleAddIngred = (id) => {
    setIngredients([...ingredients, { id: id + 1, ingredient: ''}])
    }

    const handleRemoveIngred = (i) => {
    const values = [...ingredients]
    values.splice(i, 1)
    setIngredients([...values])
    }

    const handleChangeIngredInput = (i, e) => {
    const values = [...ingredients]
    values[i][e.target.name] = e.target.value
    setIngredients(values)
    }

       const handleAddInstr = (id) => {
    setInstructions([...instructions, { id: id + 1, instruction: ''}])
    }

    const handleRemoveInstr = (i) => {
    const values = [...instructions]
    values.splice(i, 1)
    setInstructions([...values])
    }

    const handleChangeInstrInput = (i, e) => {
    const values = [...instructions]
    values[i][e.target.name] = e.target.value
    setInstructions(values)
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
     <Form >
      <Row>
        <Col>
        <Image src={myImage} fluid />
        </Col>
        <Col>
        
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
          
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Recipe Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange}/>
            </Form.Group>
        </Col>
      </Row>
      <hr/>
      <Container>
        <div className="my-4 border-bottom">
            <h2>Ingredients</h2>
        </div>
      </Container>      
      <Row>
        {ingredients.map((ingredient,i) => (
          <Form.Group className="my-1" controlId="formIngredients" key={ingredient.id}>
            <Row>
              <Col>
                <Form.Control 
                  type="text"
                  value={ingredient.ingredient}
                  onChange={(e) => handleChangeIngredInput(i, e)}
                  placeholder="Enter Ingredient"/>
                </Col>
                <Col>        
                  <Button className= "my-1 mx-2" variant="primary" type="button" onClick={() => handleAddIngred(i)}>
                    +
                  </Button>
                  <Button disabled={ingredient.id === 0} onClick={() => handleRemoveIngred(i)} >
                    -
                  </Button>
                </Col>
            </Row>
          </Form.Group>
        ))}
      </Row>
      <Container>
        <div className="my-4 border-bottom">
            <h2>Instructions</h2>
        </div>
      </Container>
      <Row>
        {instructions.map((instruction,i) => (
          <Form.Group className="my-1" controlId="formIngredients" key={instruction.id}>
            <Row>
              <Col>
                <Form.Control 
                  type="text"
                  value={instruction.instruction}
                  onChange={(e) => handleChangeInstrInput(i, e)}
                  placeholder="Add Step"/>
                </Col>
                <Col>        
                  <Button className= "my-1 mx-2" variant="primary" type="button" onClick={() => handleAddInstr(i)}>
                    +
                  </Button>
                  <Button disabled={instruction.id === 0} onClick={() => handleRemoveInstr(i)} >
                    -
                  </Button>
                </Col>
            </Row>
          </Form.Group>
        ))}
      </Row>

      <Button className="mt-3 mx-4" variant="primary" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button className="mt-3" variant="primary" type="button" onClick={onSubmit}>
        Submit
      </Button> 
      </Form>  
    </Container> 
        <hr/> 
  

    </>);
    
}

export default CreateRecipe;