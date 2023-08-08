
import React from 'react'
import {useState,useEffect} from 'react'
import Axios from '../axios'
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from 'react-router';
export default function Home() {

  const [recipes,setrecipes]=useState([]);
  const [input,setinput]=useState([]);
 const [savedRecipes,setsavedrecipes]=useState([]);
 const Navigate=useNavigate();
 const userID = localStorage.getItem('userID')
 
 useEffect(()=>{
  

fetchrecipe();
fetchsaved();

 },[]);

 const fetchsaved=async()=>{

    try{
        const response=await Axios.get( `http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        setsavedrecipes(response.data.savedRecipes);

    }catch(err){
        console.log(err)
    }
}

 const fetchrecipe= async() => {
    try{
        const response=await Axios.get("http://localhost:3001/recipes")
        setrecipes([...response.data]);
        setinput([...response.data]);
        
    }
    catch(err){
        console.log(err);
    }
};
 
const handlechange=(value)=>{
    let data=input.filter((item,i)=>(item.name.toLowerCase().includes(value.toLowerCase()) ||item.cookingTime <= value ||item.recipetype.toLowerCase().includes(value.toLowerCase())))
    console.log(data,'data');
    setrecipes([...data])
}
const saverecipe=async(recipeID)=>{
    try{
        const response=await Axios.put("http://localhost:3001/recipes",{ 
            recipeID,
            userID,
        });
        //console.log([response.data.savedRecipes]);
        toast.success("Recipe saved sucessfully");
        fetchsaved();
    }
    catch(err){
        toast.error("Login to save the Recipe");
        console.log(err);
    }
};

const handleclick=()=>{
  Navigate("/addrecipe");

}

 const isRecipeSaved = (id) => savedRecipes.includes(id);
  return (
    <div className="container mt-5"> 
        <div className="container mb-5" >
        <h1 >RECIPES</h1>
        <form className="d-flex  my-2 my-lg-0">
   
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search and Filter"
          aria-label="Search"
          onChange={(e)=>handlechange(e.target.value)}
          
        />
        <button type="buttton"className="btn btn-sm btn-primary " 
        onClick={handleclick}  >
            ADD RECIPE
          </button>
          </form>
      </div>
    <ul className="list-unstyled row">
      {recipes?.map((recipe) => (
        <li key={recipe._id} className="col-lg-6 mb-5">
          <div className="card">
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h2 className="card-title">{recipe.name}</h2>
              <button
                onClick={() => saverecipe(recipe._id)}
                className="btn btn-primary"
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id)?"saved":"save"}
              </button>
              <div className="instructions mt-3">
                <h5>Instructions:</h5>
                <p>{recipe.instructions.join(", ")}</p>
              </div>
              <div className="ingredients">
                <h5>Ingredients:</h5>
                <p>{recipe.ingredients.join(", ")}</p>
              </div>
              <p>
                <h5>Cooking Time: </h5>
                {recipe.cookingTime} minutes
              </p>
              <div className="recipetype">
                <h5>Recipetype:</h5>
                <p>{recipe.recipetype}</p>

              </div>
              <div className="date " class="pull-right">
                
                <p>{recipe.date}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
};

  



