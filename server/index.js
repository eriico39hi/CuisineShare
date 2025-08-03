//Includes
const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Users = require("./model/Users")
const Recipes = require("./model/Recipes")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

dotenv.config()
const app = express()
app.use(express.json())

//Service post request to register new account
app.post("/api/auth/register", async (req,res)=>{
    try{
        const {username, password} = req.body
        let user = await Users.findOne({username})

        if(user) return res.status(401).json({"msg":"A user already exists with that username"})
        const passwordHash = await bcrypt.hash(password, 10)
        user = new Users({username,password:passwordHash})
        user.save()

        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
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
        
        const token = await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({id:user._id,token})
    }
    catch(err){console.log(err)}    
})

//Service post request to submit new recipe to database
app.post("/api/recipesubmit", async (req,res)=>{
    const {name, time, description, ingredients, instructions} = req.body
    
    try{
        
        let recipe = await Recipes.findOne({name})

        if(recipe) return res.status(401).json({"msg":"A recipe with that name already exists"})
        
        recipe = new Recipes({name, time, description, ingredients, instructions})
        recipe.save()
    }
    catch(err){console.log(err)}    
})

//Service get request for my recipes
app.get("/api/myrecipes", async (req,res)=>{


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