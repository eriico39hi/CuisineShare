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
      setFile(window.URL.createObjectURL(file));
      
      const freader = new FileReader()
      freader.readAsDataURL(file)
      
      freader.onload = function(){
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

      let image = fileString
      if(!fileString){
        //Raw encoded base64 image for "image not found" .... way easier than messing with the file reader again to read a static file
        image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QCNRXhpZgAASUkqAAgAAAADAA4BAgBDAAAAMgAAABoBBQABAAAAdQAAABsBBQABAAAAfQAAAAAAAABObyBQaWN0dXJlIEF2YWlsYWJsZSBQbGFjZWhvbGRlciBUaHVtYm5haWwgSWNvbiBJbGx1c3RyYXRpb24gRGVzaWduLAEAAAEAAAAsAQAAAQAAAP/hBb9odHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzL2lTdG9ja3Bob3RvIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMTQwOTMyOTAyOCIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL2xlZ2FsL2xpY2Vuc2UtYWdyZWVtZW50P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiBwbHVzOkRhdGFNaW5pbmc9Imh0dHA6Ly9ucy51c2VwbHVzLm9yZy9sZGYvdm9jYWIvRE1JLVBST0hJQklURUQtRVhDRVBUU0VBUkNIRU5HSU5FSU5ERVhJTkciID4KPGRjOmNyZWF0b3I+PHJkZjpTZXE+PHJkZjpsaT5DYWlxdWFtZTwvcmRmOmxpPjwvcmRmOlNlcT48L2RjOmNyZWF0b3I+PGRjOmRlc2NyaXB0aW9uPjxyZGY6QWx0PjxyZGY6bGkgeG1sOmxhbmc9IngtZGVmYXVsdCI+Tm8gUGljdHVyZSBBdmFpbGFibGUgUGxhY2Vob2xkZXIgVGh1bWJuYWlsIEljb24gSWxsdXN0cmF0aW9uIERlc2lnbjwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgo8cGx1czpMaWNlbnNvcj48cmRmOlNlcT48cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz48cGx1czpMaWNlbnNvclVSTD5odHRwczovL3d3dy5pc3RvY2twaG90by5jb20vcGhvdG8vbGljZW5zZS1nbTE0MDkzMjkwMjgtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAI5QaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAchwCUAAIQ2FpcXVhbWUcAngAQ05vIFBpY3R1cmUgQXZhaWxhYmxlIFBsYWNlaG9sZGVyIFRodW1ibmFpbCBJY29uIElsbHVzdHJhdGlvbiBEZXNpZ24cAm4AGEdldHR5IEltYWdlcy9pU3RvY2twaG90b//bAEMACgcHCAcGCggICAsKCgsO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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACRwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASB/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASJ//wD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABI3/AP8A7f4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAkj//AP24BPwAAAAAAAAAAAAAAAAAAAAAAAAAAAJE/wD/APakAAH/AAAAAAAAAAAAAAAAAAAAAAAAAAABG/8A/wDckAAAA/cAAAAAAAAAAAAAAAAAAAAAAAEkf/8A+3IAAAAAB/wAAAAAAAAAAAAAAAAAAAAABI3/AP8A7cgAAAAAAAH/AAAAAAAAAAAAAAAAAAAAAAI3/wD/ALEgAAAgAAAAAf8AAAAAAAAAAAAAAAAAAAII/wD/APbkAAAAAH/cAAAH/AAAAAAAAAAAAAAAAAkz/wD/ANqQAAAAACP/AP4AAAH8AAAAAAAAAAAAAAAkb/8A/wBiQAAAAAAAb/8A/AAAA/4AAAAAAAAAAAAAAE//AO2IAAAAAAAAAP8A/wD8AAAH/AAAAAAAAAAAAAAAj/8AJAAAAAAAAAAAv/8A8AAADfgAQAAAAAAAAAAAAB/wB/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AgAAAAAAAAAAAAE/AD/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8AAAAAAAAAAAAAAB/wH/8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP4AAAAAAAAAAAAAH/A+4AAAAAAAAAAAAAAAAAAJ/AAAAAAAAAAAAABPwH3AAAAAAAAAAAAAAAAAABP4AAAAAAAAAAAAAB/w+4AAAAAAAAAAAAAAAAAAJ/AAAAAAAAAAAAABP2H3AAAAAAAAAAAAB28AAABP4AAAAAAAAAAAAAB/w+4AAAIAAAAAAAA//wBgAACfwAAAAAAAAAAAAAAf99wAAAcAAAAAAAD/AP8A4AABP4AAAAAAAAAAAAABH3+4AAA/wAAAAAAB/wD/AMAAAn8AAAAAAAAAAAAAAH//AHAAAH+wAAAAABP/AP8AAAAE/gAAAAAAAAAAAAAAn/7gAAn/AP4AAIAAJ/8A9wAA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"
      }

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