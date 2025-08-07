import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import myImage from '../assets/image-not-found.jpg'

function CreateRecipe() {
  
  const navigate = useNavigate()
  const URL = "http://localhost:3000/api/newrecipe"

  const [name, setName] = useState("")
  const [time, setTime] = useState(0)
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState([{ingredient: ""}])
  const [instructions, setInstructions] = useState([{instruction: ""}])

  const[fileBuffer, setFileBuffer] = useState(null)
  const[fileName, setFileName] = useState('')
  const[fileType, setFileType] = useState('')
  const[fileString, setFileString] = useState('')
  const[file, setFile] = useState(null)
 

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
      setFile(window.URL.createObjectURL(file));
      
      
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

  const handleAddIngred = () => {
    setIngredients([...ingredients, { ingredient: ''}])
    console.log(ingredients)
  }

  const handleRemoveIngred = (index) => {
    const values = [...ingredients]
    values.splice(index, 1)
    setIngredients([...values])
    console.log(ingredients)
  }

  const handleChangeIngredInput = (index, e) => {
    const values = [...ingredients]
    values[index]= e.target.value
    setIngredients(values)
    console.log(ingredients)
  }

  const handleAddInstr = () => {
    setInstructions([...instructions, {instruction: ''}])
 
  }

  const handleRemoveInstr = (index) => {
    const values = [...instructions]
    values.splice(index, 1)
    setInstructions([...values])

  }

  const handleChangeInstrInput = (index, e) => {
    const values = [...instructions]
    values[index] = e.target.value
    setInstructions(values)
    console.log(instructions)
  }


  const onSubmit = async (event) =>{

    const image = fileString
    event.preventDefault();

    const test = JSON.stringify({name,time,image,description,ingredients,instructions})
    console.log(test)
    
    try{
      let response = await fetch(URL,{
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({name,time,image,description,ingredients,instructions})
      })

      const data = await response.json()
      console.log(data)
      navigate(`/View/${data.id}`)
    }

    catch(err){console.log(err)}
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
                <Nav.Link className="text-black" href="/Profile">Profile</Nav.Link>
            </Nav>
        </Navbar.Collapse>            
      </Container>
    </Navbar>
     <Container>
      <div className="my-4 pb-2 border-bottom">
        <h1>Create New Recipe</h1>
      </div>
    </Container>
    <Container className = "mt-3">
     <Form onSubmit={onSubmit}>
      <Row>
        <Col>
            <Image src={file||myImage} fluid className="border border-dark border-1 h-100"/>
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
        {ingredients.map((ingredient,index) => (
          <Form.Group className="my-1" controlId="formIngredients" key={index}>
            <Row>
              <Col>
                <Form.Control 
                  type="text"
                  name="ingredient"
                  value={ingredient.ingredient}
                  onChange={(e) => handleChangeIngredInput(index, e)}
                  placeholder="Enter Ingredient"/>
                </Col>
                <Col>        
                  <Button disabled={(index+1)<ingredients.length} className= "my-1 mx-2" variant="primary" type="button" onClick={() => handleAddIngred()}>
                    +
                  </Button>
                  <Button disabled={index === 0 && ingredients.length===1} onClick={() => handleRemoveIngred(index)} >
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
        {instructions.map((instruction,index) => (
          <Form.Group className="my-1" controlId="formIngredients" key={index}>
            <Row>
              <Col>
                <Form.Control 
                  type="text"
                  name="instruction"
                  value={instruction.instruction}
                  onChange={(e) => handleChangeInstrInput(index, e)}
                  placeholder="Add Step"/>
                </Col>
                <Col>        
                  <Button disabled={(index+1)<instructions.length} className = "my-1 mx-2" variant="primary" type="button" onClick={() => handleAddInstr()}>
                    +
                  </Button>
                  <Button disabled={index === 0 && instructions.length===1} onClick={() => handleRemoveInstr(index)} >
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