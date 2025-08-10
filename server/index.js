/*
*   index.js
*
*   The Back-End
*   Handles all api calls from front end pages in client directory
*   Interacts with MongoDB and uses Mongoose schema to store and retrieve data
*/

const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Users = require("./model/Users")
const Recipes = require("./model/Recipes")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const cors = require("cors")

dotenv.config()
const app = express()
app.use(express.json({limit:'5mb'}))
app.use(cors())

//Service post request to register new account
//Information contained in body of request is saved to MongoDB if that user doesn't already exist
//Similar to Assignment 3 code but the JWT token is also signed with username
app.post("/api/auth/register", async (req,res)=>{
    try{
        const {username, email, password} = req.body
        let user = await Users.findOne({username})

        if(user) return res.status(401).json({"msg":"A user already exists with that username"})
        const passwordHash = await bcrypt.hash(password, 10)
        user = new Users({username,email,password:passwordHash})
        user.save()

        const token = await jwt.sign({id:user._id,user:username},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({id:user._id,token})
    }
    catch(err){console.log(err)}
})

//Service post request to login verifies with password hash
//Similar to Assignment 3 code but the JWT token is also signed with username
app.post("/api/auth/login", async (req,res)=>{
    const {username, password} = req.body

    try{
        let user = await Users.findOne({username})
        if(!user) return res.status(401).json({"msg":"Wrong username or password"})

        const passwdTest = await bcrypt.compare(password,user.password)
        if (!passwdTest) return res.status(401).json({"msg":"Wrong username or password"})
        
        const token = await jwt.sign({id:user._id,user:username},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({id:user._id,token})
    }
    catch(err){console.log(err)}    
})

//Service post request to submit new recipe to database
//Information contained in body of request is saved to MongoDB if that recipe doesn't already exist
app.post("/api/newrecipe", async (req,res)=>{
    const {name, author, time, image, description, ingredients, instructions} = req.body
    
    try{
        
        let recipe = await Recipes.findOne({name})

        if(recipe) return res.status(401).json({"msg":"A recipe with that name already exists"})
        
        recipe = new Recipes({name, author, time, image, description, ingredients, instructions})
        recipe.save()

        const token = await jwt.sign({id:recipe._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({id:recipe._id,token})
    }
    catch(err){console.log(err)}    
})

//Service get request for all recipes
//An offset is contained in the URL as a query "?offset=xx"
//Recipes are fetched based on this offset, the offset is incremented at the front-end until a 404 is sent back here
app.get("/api/allrecipes", async (req,res)=>{

    const offset = parseInt(req.query.offset)
    const recipe = await Recipes.findOne().skip(offset)

    if(!recipe){
        return res.status(404).json({error: 'No more recipes'})
    }
    res.json(recipe)

})

//Service get request for a users created recipes
//Functions the same way as "allrecipes" but user is also part of the query and is filtered on
app.get("/api/myrecipes", async (req,res)=>{

    const user = req.query.user
    const offset = parseInt(req.query.offset)

    const recipe = await Recipes.findOne({author:user}).skip(offset)

    if(!recipe){
        return res.status(404).json({error: 'No more recipes'})
    }
    return res.json(recipe)

})

//Service get request for a users favorited recipes
//Username and offset are part of the query like myrecipes
//This function first queries the user for their array of favorites, then queries the recipes in that array
//That array is indexed with the offset (instead of the findOne like the other similar endpoints)
app.get("/api/favrecipes", async (req,res)=>{

    const username = req.query.user
    const offset = parseInt(req.query.offset)
    console.log(offset)

    const userData = await Users.findOne({username:username})
    if(!userData){
        return res.status(404).json({error: 'User not found'})
    }

    const favorites = userData.favorites
    console.log(favorites)

    if(!favorites || offset >= favorites.length){
        return res.status(404).json({error: 'No more recipes'})
    }

    const recipe = await Recipes.findOne({_id:favorites[offset]})
    return res.json(recipe)


})

//Service get request for a single recipe
//recipeID is in the URL, very simple endpoint that just returns all data for the recipe in the URL
app.get("/api/view/:recipeID", async (req,res)=>{

    
    try{
        const recipeID = req.params.recipeID
        const recipeInfo = await Recipes.findOne({_id:recipeID})
        return res.json({"recipeData":JSON.stringify(recipeInfo)})
    }
    catch(err){console.log(err)}
})

//Service a POST request for adding a new favorite recipe
//User and recipeID are in the body of the POST request
//Users MongoDB entry is updated and a new ID is added to the array of favorites (recipeID)
app.post("/api/addfavorite/", async (req,res)=>{

    const {userID, recipeID} = req.body

    try{
        await Users.updateOne({_id:userID},{$addToSet:{favorites:recipeID}})
        return res.status(200).json({success: true, message: 'Favorite Successful'})
    }
    catch(err){console.log(err)}
})

//Create connection to mongoDB and start server
async function serverStart(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        app.listen(process.env.PORT,()=>{
            console.log('Server has started')
        })
    }
    catch(err){console.log(err)}
}

serverStart()