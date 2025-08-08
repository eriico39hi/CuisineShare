import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Login() {
  const URL = "http://localhost:3000/api/auth/login"
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [validated, setValidated] = useState(false)
  
  const navigate = useNavigate()
  

  //submit handler
  const onsubmit = async (event)=>{
      
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    else {
      setValidated(true);

      try{
          let response = await fetch(URL,{
              method:"POST",
              headers:{
                  "content-type":"application/json"
              },
              body:JSON.stringify({username,password})
          })
            const data = await response.json()
            const token = data.token
            console.log(data)
            if(response.ok && token){
              localStorage.setItem("token",token)
              navigate("/MyRecipes")
            }
            else{
              alert(data.msg || "Login failed!")
            }
      } 
      catch(err){
        console.log(err)
      }
    }
      
  }


  return (<>
    <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
      <Container>
        <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
    <Container className = "container d-flex justify-content-center align-items-center mt-5">
      <Card className="text-center" style={{ width: '20rem' }}>
        <Card.Header className="fs-1 fw-bold bg-transparent" >Account Login</Card.Header>
        <Card.Body>
          <Container>
            <Form noValidate validated={validated} onSubmit={onsubmit}>
              <Col>
                <Form.Group  as={Row} className="mb-3" controlId="formGridUsername">
                  <Form.Label className="text-black">Username</Form.Label>
                  <Form.Control 
                    required
                    type="text" 
                    value={username}  
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="Enter Username" />
                  <Form.Control.Feedback type="invalid">
                     Cannot be empty.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formGridPassword">
                  <Form.Label className="text-black">Password</Form.Label>
                  <Form.Control
                    required
                    type="password" 
                    value={password}
                    minLength={6}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter Password" />
                  <Form.Control.Feedback type="invalid">
                     Must be at least 6 characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Button className="mt-3" variant="primary" type="button" onClick={onsubmit}>
                Login
              </Button>
              <Nav.Link className="text-black mt-3" href="/Register">Not Signed up? Create Account</Nav.Link>
            </Form>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  </> );
}

export default Login;