const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const Admin = require("../models/admin");
const User = require('../models/user');
const adminController = require("../controllers/admin");

router.post(
    "/signup",
    [
      body("email")
        .isEmail()
        .withMessage("Please enter a valid email.")
        .custom((value, { req }) => {
          return Admin.findOne({ email: value }).then((userDoc) => {
            if (userDoc) {
              return Promise.reject("E-Mail address already exists!");
            }
          });
        })
        .normalizeEmail(),
      body("password").trim().isLength({ min: 5 }).isAlphanumeric(),
      body('confirmPassword').custom((value, {req}) => {
        if(value !== req.body.password) {
          throw new Error('Password mismatch!');
        }
        return true;
      })
    ],
    adminController.signup
  );

router.post("/login", adminController.login);


module.exports = router;