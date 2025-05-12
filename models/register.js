const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registerSchema = new Schema({
regNo: {
    type: Number,
    required: true
},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})
const Register = new mongoose.model('Register', registerSchema);
module.exports = Register;