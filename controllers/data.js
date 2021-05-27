const { validationResult } = require("express-validator/check");
const Data = require("../models/data");

exports.getCredentials = (req, res, next) => {
  Data.find()
    .then((data) => {
      res
        .status(200)
        .json({ message: "Fetched data successfully.", data: data });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getCredential = (req, res, next) => {
  const dataId = req.params.dataId;
  Data.findById(dataId)
    .then((creds) => {
      if (!creds) {
        const error = new Error("Could not find credential.");
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Data fetched.", data: creds });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const firstname = req.body.firstname;
  const dataId = req.body.dataId;
  const lastname = req.body.lastname;
  const dob = req.body.dob;
  const imageUrl = req.file.path;
  const idType = req.body.idType;
  const data = new Data({
    firstname: firstname,
    lastname: lastname,
    dob: dob,
    dataId,
    imageUrl: imageUrl,
    idType: idType,
  });
  data
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Data submitted successfully!"
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updateData = (req, res, next) => {
  Data.findOneAndUpdate({isVerified: false}, {isVerified: true})
  .then(result => {
    res.status(200).json({message: "updated successfully!"})
  })
  .catch((err) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
};