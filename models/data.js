const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
      type: String,
      required: true
  },
  dob: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  idType: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Data", dataSchema);
