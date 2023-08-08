import express from "express";
import mongoose from "mongoose";
import { Recipemodel } from "../models/recipes.js";
import { UserModel } from "../models/users.js";
import { verifyToken } from "./Users.js";


const router = express.Router();
//get the recipe
router.get("/", async (req, res) => {
  try {
    const result = await Recipemodel.find({});
    res.status(200).json(result);
  } catch (err) {s
    res.status(500).json(err);
  }
}); 
//create the recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new Recipemodel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    image: req.body.image,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    recipetype:req.body.recipetype,
    userOwner: req.body.userOwner,
  });

  try {
    const result = await recipe.save();
    //console.log(result);
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        image: result.imageUrl,
        ingredients: result.ingredients,
        instructions: result.instructions,
        recipetype:result.recipetype,
        _id: result._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await Recipemodel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe to users saved recipe 
router.put("/",verifyToken, async (req, res) => {
  const recipe = await Recipemodel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});

//save recipe to the user myrecipe
router.post('/myrecipe', verifyToken,async(req,res)=>{
  const myrecipe = await Recipemodel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.MyRecipes.push(myrecipe);
    await user.save();
    res.status(201).json({ MyRecipes: user.MyRecipes });
  } catch (err) {
    res.status(500).json(err);
  }
});



// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});





// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await Recipemodel.find({
      _id: { $in: user.savedRecipes },
    });

   // console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get myrecipes of the user 
router.get("/Myrecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const Myrecipes = await Recipemodel.find({
      _id: { $in: user.MyRecipes },
    });
   // console.log(Myrecipes);
    res.status(200).json(Myrecipes);
  } catch (err) {
    console.error("Error in getting My Recipes");
    res.status(500).json(err);
  }
});


// DELETE API endpoint to remove a recipe from the user's savedRecipes
router.delete('/users/:userId/savedRecipes/:recipeId', async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    // Find the user by ID using Mongoose
    const user = await UserModel.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
     //console.log(user.savedRecipes,'saved recipies');
    // Remove the recipe ID from the savedRecipes array
    user.savedRecipes = user.savedRecipes.filter((savedRecipe) => savedRecipe.toString() !== recipeId);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Recipe removed from saved recipes.' });
  } catch (error) {
    console.error('Error removing recipe from saved recipes:', error);
    res.status(500).json({ message: 'Failed to remove recipe from saved recipes.' });
  }
});


//edit the recipe the user have added 


router.put("/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const updatedRecipe = req.body;

    // Find the recipe by ID and update its details
    const updated = await Recipemodel.findByIdAndUpdate(
      recipeId,
      updatedRecipe,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(updated); // Return the updated recipe as the response
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ error: "Failed to update recipe" });
  }
});


//delete the recpie 


// DELETE API endpoint to remove a recipe from the complete database
router.delete('/users/:userId/myrecipes/:recipeId', async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Delete the recipe from the recipes collection
    await Recipemodel.findByIdAndDelete(recipeId);

    //delete id from myrecipes in user table
   
    await UserModel.updateMany({}, { $pull: { MyRecipes: recipeId } });

    // Delete the recipe from the "savedRecipes" of all users
    await UserModel.updateMany({}, { $pull: { savedRecipes: recipeId } });
    
    res.status(200).json({ message: 'Recipe deleted successfully.' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Failed to delete recipe.' });
  }
});



export { router as recipesRouter };
