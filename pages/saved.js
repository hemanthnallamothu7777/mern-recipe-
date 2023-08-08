import React, { useState, useEffect } from 'react';
import Axios from '../axios';


export default function Saved() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      const response = await Axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnsaveRecipe = async (recipeId) => {
    try {
      const response = await Axios.delete(`http://localhost:3001/recipes/users/${userID}/savedRecipes/${recipeId}`);
      fetchSaved();
    } catch (error) {
      console.error('Error deleting recipe:', error);
      
    }
  };

  //navigate

 
  const isloggedin = localStorage.getItem('userID') !== null;

  return (
    <div className="container mt-5">
      <div className="container mb-5">
        {isloggedin ? <h1>SAVED RECIPES</h1> : <h1>LOGIN TO SAVE YOUR RECIPES</h1>}
      </div>
      <ul className="list-unstyled row">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id} className="col-lg-6 mb-5">
            <div className="card">
              <img src={recipe.imageUrl} alt={recipe.name} className="card-img-top" />
              <div className="card-body">
                <h2 className="card-title">{recipe.name}</h2>
                <button className="btn btn-primary" onClick={() => handleUnsaveRecipe(recipe._id)}>
                  UNSAVE
                </button>
                <div className="instructions mt-3">
                  <h5>Instructions:</h5>
                  <p>{recipe.instructions.join(', ')}</p>
                </div>
                <div className="ingredients">
                  <h5>Ingredients:</h5>
                  <p>{recipe.ingredients.join(', ')}</p>
                </div>
                <p>
                  <h5>Cooking Time: </h5>
                  {recipe.cookingTime} minutes
                </p>
                <div className="recipetype">
                  <h5>Recipetype:</h5>
                  <p>{recipe.recipetype}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
