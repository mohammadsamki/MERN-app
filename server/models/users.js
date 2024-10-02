const mongoose = require('mongoose');

// class for User
//  att : username,phone 
// / create object follow  
//  schema > att > validation
const userSchema = new mongoose.Schema({
    username:{ type: String, required: true },
    phone:{ type: Number, required: true },
})

const User = mongoose.model('users',userSchema);

module.exports = User;