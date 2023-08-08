"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.userRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _users = require("../models/users.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

exports.userRouter = router;
router.post("/register", function _callee(req, res) {
  var _req$body, username, password, user, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(_users.UserModel.findOne({
            username: username
          }));

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "Username already exists"
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(password, 10));

        case 8:
          hashedPassword = _context.sent;
          newUser = new _users.UserModel({
            username: username,
            password: hashedPassword
          });
          _context.next = 12;
          return regeneratorRuntime.awrap(newUser.save());

        case 12:
          res.json({
            message: "User registered successfully"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post("/login", function _callee2(req, res) {
  var _req$body2, username, password, user, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_users.UserModel.findOne({
            username: username
          }));

        case 3:
          user = _context2.sent;

          if (user) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Username or password is incorrect"
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(_bcrypt["default"].compare(password, user.password));

        case 8:
          isPasswordValid = _context2.sent;

          if (isPasswordValid) {
            _context2.next = 11;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Username or password is incorrect"
          }));

        case 11:
          token = _jsonwebtoken["default"].sign({
            id: user._id
          }, "secret");
          res.json({
            token: token,
            userID: user._id
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  });
});

var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.headers.authorization;

  if (authHeader) {
    _jsonwebtoken["default"].verify(authHeader, "secret", function (err) {
      if (err) {
        return res.sendStatus(403);
      }

      next();
    });
  } else {
    res.sendStatus(401);
  }
};

exports.verifyToken = verifyToken;