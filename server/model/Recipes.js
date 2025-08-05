const mongoose = require("mongoose")

const recipeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    time:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        data:Buffer,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    /*
    ingredients:{
        type:Array,
        required:true
    },
    instructions:{
        type:Array,
        required:true
    },
    */
})

const Recipes = mongoose.model('Recipes',recipeSchema)
module.exports = Recipes