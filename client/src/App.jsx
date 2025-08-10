/*
*   App.jsx
*
*   Main router for the whole site
*/

import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import MyRecipes from './components/MyRecipes'
import BrowseRecipes from './components/BrowseRecipes'
import CreateRecipe from './components/CreateRecipe'
import RecipeInfo from './components/RecipeInfo'
import './bootstrap.min.css'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Welcome />} />
        <Route path="/Home" element = {<Welcome />} />
        <Route path="/Register" element ={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/MyRecipes" element={<MyRecipes />} />
        <Route path="/BrowseRecipes" element={<BrowseRecipes />} />
        <Route path="/CreateRecipe" element={<CreateRecipe />} />
        <Route path="/View/:recipeID" element={<RecipeInfo />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
