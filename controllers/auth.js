const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("An error occured while signing up.");
    error.statusCode = 422;
    error.data = errors.array()[0].msg;
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  bcrypt
    .hash(password, 12)
    .then((hashedpassword) => {
      const user = new User({
        email: email,
        password: hashedpassword,
        confirmPassword: confirmPassword,
      });
      return user.save();
    })
    .then((result) => {
      console.log("Created Successfully!");
      res.status(201).json({ message: "User Created!", userId: result._id });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
  .then(user => {
    if(!user) {
      const error = new Error('User is not signed up!');
      error.statusCode = 422;
      throw error;
    }
    signedInUser = user;
    res.status(200).json({message: "Fetched Succesful.", userId: signedInUser._id.toString() })
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};

exports.getLogin = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      console.log(user);
      if (!user) {
        const error = new Error("User does not exist");
        error.statusCode = 422;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Fetched successfully.", email: user.email });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("Email not found!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "thisismyveryownsecret",
        { expiresIn: "12h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.logout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
  });
};
