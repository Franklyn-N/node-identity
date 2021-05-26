const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();
const User = require("../models/user");
const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
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
  authController.signup
);

router.get('/signup/:userId', authController.getSignup);

router.get('/login/:userId', authController.getLogin);

router.post("/login", authController.login);

router.post('/logout', authController.logout);

module.exports = router;
