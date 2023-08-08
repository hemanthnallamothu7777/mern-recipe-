import React, { useEffect, useState } from "react";
import Axios from "../axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { MuiChipsInput } from "mui-chips-input";

const Myrecipes = () => {
  const [Myrecipes, setMyrecipes] = useState([]);
  const [editRecipe, setEditRecipe] = useState(null);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetchmyrecipe();
  }, []);

  // Model handling
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchmyrecipe = async () => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/recipes/myrecipes/${userID}`
      );
      setMyrecipes(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecipeDetails = async (recipeID) => {
    try {
      const response = await Axios.get(
        `http://localhost:3001/recipes/${recipeID}`
      );
      setEditRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };



  // Edit the recipe
  const handleEdit = (recipeID) => {
    fetchRecipeDetails(recipeID); // Fetch recipe details from the server and set the state
    handleShow(); // Open the edit modal
  };

  // Handling the image uploaded
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditRecipe({ ...editRecipe, imageUrl: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  // handling the chips and the normal names 
  const handleChange = (event, type) => {
    const { name, value } = event.target || event; // Access 'name' and 'value' properties based on event type
    if (type === 'chip') {
      setEditRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value, // Update the property dynamically based on 'name'
      }));
    } else {
      setEditRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };
  
  //edit api 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a PUT request to update the recipe details in the database
      await Axios.put(`http://localhost:3001/recipes/${editRecipe._id}`, editRecipe);
      handleClose(); 

      // Update the Myrecipes state with the updated recipe
      setMyrecipes((prevRecipes) => {
        const updatedRecipes = prevRecipes.map((recipe) =>
          recipe._id === editRecipe._id ? editRecipe : recipe
        );
        return updatedRecipes;
      });

      toast.success('Recipe updated successfully!');
    } catch (error) {
      console.error('Error updating recipe:', error);
     
    }
  };
  
  // Delete recipe
  const handleDelete = async (recipeID) => {
    try {
      await Axios.delete(
        `http://localhost:3001/recipes/users/${userID}/myrecipes/${recipeID}`
      );

      // Refresh the list after deletion
      fetchmyrecipe();
      toast.success("Recipe deleted successfully!!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="container mt-5">
      <div className="container mb-5">
        <h1>MYRECIPES</h1>
      </div>
      <ul className="list-unstyled row">
        {Myrecipes?.map((recipe) => (
          <li key={recipe._id} className="col-lg-6 mb-5">
            <div className="card">
              <img src={recipe.imageUrl} alt={recipe.name} className="card-img-top" />
              <div className="card-body">
                <h2 className="card-title">{recipe.name}</h2>

                {/* Buttons to edit and delete */}
                <Link onClick={() => handleEdit(recipe._id)} className="btn btn-primary m-2">
                  EDIT
                </Link>
                {/* Button to delete */}
                <button onClick={() => handleDelete(recipe._id)} className="btn btn-danger m-2">
                  DELETE
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
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Edit Recipe Form */}
          {editRecipe && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Recipe Name:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="name"
                  name="name"
                  value={editRecipe.name}
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                />
              </div>
              {/* Add more form fields for other recipe details (ingredients, instructions, imageUrl, cookingTime, recipetype, etc.) */}
              <div className="form-group">
                <label htmlFor="ingredients">Ingredients:</label>
                <MuiChipsInput
                  value={editRecipe.ingredients}
                  name="ingredients"
                  onChange={(value) => handleChange({ target: { name: 'ingredients', value } }, 'chip')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="instructions">Instructions:</label>
                <MuiChipsInput
                  value={editRecipe.instructions}
                  name="instructions"
                  onChange={(value) => handleChange({ target: { name: 'instructions', value } }, 'chip')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">ImageUrl:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="imageUrl"
                  name="imageUrl"
                  value={editRecipe.imageUrl} // Show the data URL in the input field
                  onChange={handleChange}
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>

              <div className="form-group">
                <label htmlFor="cookingTime">Cooking Time:</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="form-control"
                  id="cookingTime"
                  name="cookingTime"
                  value={editRecipe.cookingTime}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="recipetype">Recipe Type:</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="recipetype"
                  name="recipetype"
                  value={editRecipe.recipetype}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                UPDATE
              </button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Myrecipes;
