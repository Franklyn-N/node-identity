const { validationResult } = require("express-validator/check");
const path = require("path");
const Data = require('../models/data');


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
  const lastname = req.body.lastname;
  const dob = req.body.dob;
  const imageUrl = req.file.path;
  const idType = req.body.idType;
  const data = new Data({
    firstname: firstname,
    lastname: lastname,
    dob: dob,
    imageUrl: imageUrl,
    idType: idType
  });
  data.save()
  .then(result => {
     res.status(201).json({
         message: 'Data submitted successfully!',
         data: result
     });
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};
