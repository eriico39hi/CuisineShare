/*
*   CreateRecipe.jsx
*
*   Page that allows you to create new recipe. Multiple form types are shown that are all stored in the 
*   recipe database upon clicking submit.
*/


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import myImage from '../assets/image-not-found.jpg';
import { jwtDecode } from "jwt-decode";
import NavBar from './NavBar.jsx';

function CreateRecipe() {
  
  const navigate = useNavigate()
  const URL = "http://localhost:3000/api/newrecipe"

  const [name, setName] = useState("")
  const [time, setTime] = useState(0)
  const [description, setDescription] = useState("")
  const [ingredients, setIngredients] = useState([{ingredient: ""}])
  const [instructions, setInstructions] = useState([{instruction: ""}])

  const[fileString, setFileString] = useState('')
  const[file, setFile] = useState(null)
  const [validated, setValidated] = useState(false)
 

  const onCancel = async (event) => {
        navigate(-1)
  }

  //This function handles image selection.
  //When the browse button is clicked on the page, a file browser pops up to select your image from your PC
  //Upon selection, the image is converted into a base64 string using the FileReader class
  //On submit, this string will be stored into MongoDB along with the other recipe data
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if(file){
      setFileName(file.name)
      setFileType(file.type)
      setFile(window.URL.createObjectURL(file));
      
      const freader = new FileReader()
      freader.readAsDataURL(file)
      
      freader.onload = function(){
        console.log(freader.result)
        setFileString(freader.result)
      }
      console.log(file)
    }  
  }

  //This set of functions handles adding and removing ingredient forms from the page as well as changing their values
  const handleAddIngred = () => {
    setIngredients([...ingredients, { ingredient: ''}])
  }
  const handleRemoveIngred = (index) => {
    const values = [...ingredients]
    values.splice(index, 1)
    setIngredients([...values])
  }
  const handleChangeIngredInput = (index, e) => {
    const values = [...ingredients]
    values[index]= e.target.value
    setIngredients(values)
  }

  //This set of functions handles adding and removing instruction steps forms from the page as well as changing their values
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
  }

  //This function fires when submit is clicked. It compiles the data from all fields on the page and sends to the back-end.
  //The back-end will create a new recipe in MongoDB with all this information
  const onSubmit = async (event) =>{

    const form = event.currentTarget;
    console.log(form.checkValidity())
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setValidated(true);

      const image = fileString
      let author = "Unknown"
      const token = localStorage.getItem("token")
      event.preventDefault();
      console.log(jwtDecode(token).user)

      if(token != null){
        author = jwtDecode(token).user
      }
      
      try{
        let response = await fetch(URL,{
          method:"POST",
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({name,author,time,image,description,ingredients,instructions})
        })
        const data = await response.json()
        console.log(data)
        navigate(`/View/${data.id}`)
      }
      catch(err){console.log(err)}
    }
  } 

  //The return page elements themselves. All bootstrap.
  return (<>
    <NavBar/>
    <Container>
      <div className="my-4 pb-2 border-bottom">
        <h1>Create New Recipe</h1>
      </div>
    </Container>
    <Container className = "mt-3">
     <Form noValidate validated={validated} onSubmit={onSubmit}>
      <Row>
        <Col>
            <Image src={file||myImage} fluid className="border border-dark border-1 h-100"/>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              required
              type="text" 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter Recipe Name"/>
            <Form.Control.Feedback type="invalid">
                Cannot be empty.
            </Form.Control.Feedback>                   
          </Form.Group>
          <Form.Group className="mb-3" controlId="duration">
            <Form.Label>Est. Time (min.)</Form.Label>
            <Form.Control
              required
              type="number" 
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              placeholder="Enter Recipe Time in minutes"/>
            <Form.Control.Feedback type="invalid">
                Cannot be empty.
            </Form.Control.Feedback>                 
          </Form.Group>
          <Form.Group className="mb-3" controlId="info">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required 
              as="textarea"
              rows={4} 
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Enter Recipe Name"/>
            <Form.Control.Feedback type="invalid">
                Cannot be empty.
            </Form.Control.Feedback>            
          </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Recipe Image</Form.Label>
            <Form.Control required type="file" onChange={handleFileChange}/>            
            <Form.Control.Feedback type="invalid">
              Cannot be empty.
            </Form.Control.Feedback>     
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
                  required 
                  type="text"
                  name="ingredient"
                  value={ingredient.ingredient}
                  onChange={(e) => handleChangeIngredInput(index, e)}
                  placeholder="Enter Ingredient"/>
                <Form.Control.Feedback type="invalid">
                    Cannot be empty.
                </Form.Control.Feedback>                       
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
                  required 
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