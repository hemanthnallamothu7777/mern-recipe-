"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _Users = require("./routes/Users.js");

var _recipes = require("./routes/recipes.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(_express["default"].json());
app.use((0, _cors["default"])());
app.use("/auth", _Users.userRouter);
app.use("/recipes", _recipes.recipesRouter);

_mongoose["default"].connect("mongodb://localhost:27017/recipies?retryWrites=true&w=majority");

app.listen(3001, function () {
  return console.log("Server started");
});