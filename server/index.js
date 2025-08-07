//Includes
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

//Service post request to login
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

//Service get request for my recipes
app.get("/api/myrecipes", async (req,res)=>{


})

//Service get request for all recipes
app.get("/api/allrecipes", async (req,res)=>{

    const offset = parseInt(req.query.offset)
    const recipe = await Recipes.findOne().skip(offset)

    if(!recipe){
        return res.status(404).json({error: 'No more recipes'})
    }
    res.json(recipe)

})

//Service get request for all recipes
app.get("/api/view/:recipeID", async (req,res)=>{

    const {recipeID} = req.params

    try{
        const recipeInfo = await Recipes.findOne({_id:recipeID})
        return res.json({"recipeData":JSON.stringify(recipeInfo)})
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