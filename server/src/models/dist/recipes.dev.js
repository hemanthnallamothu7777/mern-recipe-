"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recipemodel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var recipeschema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: [{
    type: String,
    required: true
  }],
  imageUrl: {
    type: String,
    required: true
  },
  cookingTime: {
    type: Number,
    required: true
  },
  userOwner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

var Recipemodel = _mongoose["default"].model("recipes", recipeschema);

exports.Recipemodel = Recipemodel;