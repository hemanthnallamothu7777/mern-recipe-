import mongoose from "mongoose";

const recipeschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  imageUrl: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  recipetype: {
    type: String,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date:{
    type : Date,
    default:Date.now,
    required:true,
  },
});





export const Recipemodel = mongoose.model("recipes", recipeschema);
