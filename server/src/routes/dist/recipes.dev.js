"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recipesRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _recipes = require("../models/recipes.js");

var _users = require("../models/users.js");

var _Users = require("./Users.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

exports.recipesRouter = router;
router.get("/", function _callee(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_recipes.Recipemodel.find({}));

        case 3:
          result = _context.sent;
          res.status(200).json(result);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(500).json(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //create the recipe

router.post("/", _Users.verifyToken, function _callee2(req, res) {
  var recipe, result;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          recipe = new _recipes.Recipemodel({
            _id: new _mongoose["default"].Types.ObjectId(),
            name: req.body.name,
            image: req.body.image,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            imageUrl: req.body.imageUrl,
            cookingTime: req.body.cookingTime,
            userOwner: req.body.userOwner
          });
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(recipe.save());

        case 4:
          result = _context2.sent;
          console.log(result);
          res.status(201).json({
            createdRecipe: {
              name: result.name,
              image: result.imageUrl,
              ingredients: result.ingredients,
              instructions: result.instructions,
              _id: result._id
            }
          });
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.status(500).json(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 9]]);
}); // Get a recipe by ID

router.get("/:recipeId", function _callee3(req, res) {
  var result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_recipes.Recipemodel.findById(req.params.recipeId));

        case 3:
          result = _context3.sent;
          res.status(200).json(result);
          _context3.next = 10;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json(_context3.t0);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Save a Recipe

router.put("/", function _callee4(req, res) {
  var recipe, user;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_recipes.Recipemodel.findById(req.body.recipeID));

        case 2:
          recipe = _context4.sent;
          _context4.next = 5;
          return regeneratorRuntime.awrap(_users.UserModel.findById(req.body.userID));

        case 5:
          user = _context4.sent;
          _context4.prev = 6;
          user.savedRecipes.push(recipe);
          _context4.next = 10;
          return regeneratorRuntime.awrap(user.save());

        case 10:
          res.status(201).json({
            savedRecipes: user.savedRecipes
          });
          _context4.next = 16;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](6);
          res.status(500).json(_context4.t0);

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[6, 13]]);
}); // Get id of saved recipes

router.get("/savedRecipes/ids/:userId", function _callee5(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_users.UserModel.findById(req.params.userId));

        case 3:
          user = _context5.sent;
          res.status(201).json({
            savedRecipes: user.savedRecipes
          });
          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // Get saved recipes

router.get("/savedRecipes/:userId", function _callee6(req, res) {
  var user, savedRecipes;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_users.UserModel.findById(req.params.userId));

        case 3:
          user = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(_recipes.Recipemodel.find({
            _id: {
              $in: user.savedRecipes
            }
          }));

        case 6:
          savedRecipes = _context6.sent;
          console.log(savedRecipes);
          res.status(201).json({
            savedRecipes: savedRecipes
          });
          _context6.next = 15;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          res.status(500).json(_context6.t0);

        case 15:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // router.post("/recipie_filter", async (req, res) => {
//   const { cookingTime } = req.body;
//   const recipeArray = await Recipemodel.find({ cookingTime });
//   res.status(200).json(recipeArray);
// });