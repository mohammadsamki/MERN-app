const mongoose = require('mongoose');

// class for User
//  att : username,phone
// / create object follow
//  schema > att > validation
const userSchema = new mongoose.Schema({
    username:{ type: String, required: true , unique: true  },
    phone:{ type: Number, required: true },
    password:{ type: String, required: true },
    roul: { type: String, default: 'user',required: true }, // admin,user,seller
})

const User = mongoose.model('users',userSchema);

module.exports = User;
