const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    
    name: { type: String},
    imagelink:{ type: String},
    author: { type: String},
    price: { type: Number },
    description: { type: String },
    reviews: [{
        review: { type: String },
    }]
});
const booklisting = mongoose.model("booklisting", userSchema);
module.exports = booklisting;


