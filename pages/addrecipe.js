import React, { useState } from "react";
import { MuiChipsInput } from "mui-chips-input";
import Axios from "../axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Addrecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: [],
    imageUrl: "", 
    cookingTime: "",
    recipetype: "",
    userOwner: localStorage.getItem("userID"),
    date:"",
  });
  const [selectedImage, setSelectedImage] = useState(null); // Add selectedImage state to store the selected file
//miui chips handling 


  const chipshandleChange = (value, type) => {
    setRecipe({ ...recipe, [type]: value });
  };



  //keep track of the all the inputs
  const onChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  //image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // Convert the image file to a data URL using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setRecipe({ ...recipe, imageUrl: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send the recipe data to the server and get the created recipe
      const result = await Axios.post("http://localhost:3001/recipes", recipe);
      const createdRecipe = result.data.createdRecipe;

      // Get the user ID from local storage
      const userID = localStorage.getItem("userID");

      // Add the recipe ID to the user's myrecipe array
      const response = await Axios.post(
        `http://localhost:3001/recipes/myrecipe`,
        {
          recipeID: createdRecipe._id,
          userID: userID,
        }
      );

      // Check if the recipe was successfully added to the user's MyRecipes
      if (response.status === 201) {
        navigate("/");
        toast.success("Recipe added successfully!!");
      } else {
        // Handle other response statuses or potential errors
        toast.error("Failed to add recipe to MyRecipes");
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Login/Register to add a recipe");
    }
  };

  return (
    <div class="container-fluid p-5">
    <div class="card p-4">
      <h1 class="mb-4">ADD RECIPE</h1>
      <form class="my-4" onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="name">Recipe Name:</label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter Recipe Name"
            name="name"
            onChange={onChange}
          />
        </div>

        <div class="form-group">
          <label for="ingredients">Ingredients:</label>
          <MuiChipsInput
            value={recipe?.ingredients}
            name="ingredients"
            onChange={(value) => {
              chipshandleChange(value, "ingredients");
            }}
          />
        </div>

        <div class="form-group">
          <label for="instructions">Instructions:</label>
          <MuiChipsInput
            value={recipe?.instructions}
            id="instructions"
            name="instructions"
            onChange={(value) => {
              chipshandleChange(value, "instructions");
            }}
          />
        </div>

        <div class="form-group">
          <label for="imageUrl">ImageUrl:</label>
          <input
            type="text"
            required
            class="form-control"
            id="imageUrl"
            placeholder="Paste the URL"
            name="imageUrl"
            value={recipe.imageUrl} // Show the data URL in the input field
            onChange={onChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div class="form-group">
          <label for="cookingTime">Cooking Time:</label>
          <input
            type="number"
            required
            min="1"
            class="form-control"
            id="cookingTime"
            placeholder="Cooking Time"
            name="cookingTime"
            onChange={onChange}
          />
        </div>

        <div class="form-group">
          <label for="recipetype">Recipe Type:</label>
          <input
            type="text"
            required
            class="form-control"
            id="recipetype"
            placeholder="eg: Indian, Chinese, etc."
            name="recipetype"
            onChange={onChange}
          />
        </div>

        <button class="btn btn-primary my-2 my-sm-0">Add Recipe</button>
      </form>
    </div>
  </div>
  );
}
