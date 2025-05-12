const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cart=new Schema({
    
    name: { type: String},
    imagelink:{ type: String},
    author: { type: String},
    price: { type: Number },
    description: { type: String },
    reviews: [{
        review: { type: String },
    }]
});
const Cart = mongoose.model("Cart", cart);
module.exports = Cart;