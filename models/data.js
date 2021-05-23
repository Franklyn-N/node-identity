const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema(
    {
        imageUrl: {
            type: String,
            required: true
        },
       idType: {
           type: String,
           required: true
       } 
    }
);

module.exports = mongoose.model('Data', dataSchema);