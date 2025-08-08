import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Navbar from 'react-bootstrap/Navbar';

function Register() {
  const URL = "http://localhost:3000/api/auth/register"
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
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
          body:JSON.stringify({username,email,password})
        })
        const data = await response.json()
        const token = data.token
        if(response.ok && token){
          localStorage.setItem("token",token)
          navigate("/profile")
        }
        else{
          alert(data.msg || "Registration failed!")
        }
      }
      catch(err)
      {
        console.log(err)
      }
    } 
  }

    const oncancel = async (event) => {
          navigate(-1)
    }

  return (<>

    <Navbar expand="lg" style={{ backgroundColor: '#74cbe0ff' }}>
      <Container>
        <Navbar.Brand className="fs-4 fw-bold" href="/Home">CuisineShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Container>
    </Navbar>
    <Container  className = "container d-flex justify-content-center align-items-center mt-5" fluid>
      <Card className="text-center"  style={{ width: '30rem' }}>
        <Card.Header className="fs-1 fw-bold bg-transparent">New Account Registration</Card.Header>
        <Card.Body>
          <Container >
            <Form noValidate validated={validated} onSubmit={onsubmit}>
              <Col >
                <Form.Group  as={Row} className="mb-3" controlId="formGridUsername">
                  <Form.Label>Create a Username</Form.Label>
                  <Form.Control
                    required
                    type="text" 
                    value={username}  
                    onChange={(e)=>setUsername(e.target.value)}
                    placeholder="e.g. Coolguy123" />
                  <Form.Control.Feedback type="invalid">
                     Cannot be empty.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formGridEmail">
                  <Form.Label>Enter your Email</Form.Label>
                  <Form.Control
                    required
                    type="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="e.g. cg123@aol.com" />
                  <Form.Control.Feedback type="invalid">
                     Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formGridPassword">
                  <Form.Label>Create a Password</Form.Label>
                  <Form.Control
                    required 
                    type="password" 
                    value={password}
                    minLength={6}
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Minimum length of 6" />
                  <Form.Control.Feedback type="invalid">
                    Must be at least six characters
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Button className="mt-3" variant="primary" type="button" onClick={onsubmit}>
                Submit
              </Button>
              <Button className="mt-3 mx-4" variant="primary" type="button" onClick={oncancel}>
                Cancel
              </Button>
              </Form>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  </> );
}

export default Register;

