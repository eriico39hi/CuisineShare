import { useNavigate, useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { jwtDecode } from "jwt-decode"

function RecipeCard ({recipe}) {
    
    
    const navigate = useNavigate()
    const location = useLocation();
    const currentPath = location.pathname;
    
    const faveURL = "http://localhost:3000/api/addfavorite"

    const token = localStorage.getItem("token");

    //this function is used to add a new favorite to a user
    //it triggers when the small Favorite button at the bottom of the card is clicked
    //it sends a POST request to the endpoint which appends the new recipe to the users favorites array (in MongoDB)
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

        }catch(err){console.log(err)}

        console.log("fave clicked")
    }

    return (
        <Card 
            className="border border-dark border-1 h-100"
            style={{cursor:'pointer'}}
            onClick={()=>navigate(`/View/${recipe._id}`)}
            role="button">
            <Card.Header>
                <Image src={recipe.image} fluid/>
            </Card.Header>
            <Card.Body>
                <Card.Title className="fs-4 mt-2 fw-bold">
                {recipe.name || 'Unnamed Recipe'}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Uploaded by: {recipe.author || 'Unknown'}
                </Card.Subtitle>
                <Card.Text>
                    Est. Time: {recipe.time || 'N/A'} <br />
                </Card.Text>
                {token && currentPath === '/BrowseRecipes' &&
                    <Button variant="danger" size="sm" onClick={(e) => onFavorite(e,recipe._id)}>
                        Favorite
                    </Button>
                }
            </Card.Body>
        </Card> 
    )   
}
export default RecipeCard