"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var UserSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  savedRecipes: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "recipes"
  }]
});

var UserModel = _mongoose["default"].model("users", UserSchema);

exports.UserModel = UserModel;