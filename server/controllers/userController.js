const User = require('../models/users');


exports.getUsers = async (req,res)=>{
    try{
        console.log('this is a function to get users')
         const users = await User.find();
         res.json(users);
    }
    catch(error) {
        res.status(500).json({error: error.message});
    }
}
exports.getUsersNames = async (req,res)=>{
    try{
        const users = await User.find();
        console.log('this is a function to get users names')
        const usernames = users.map(
            user =>{
                var object={_id:user._id,username: user.username,};
                return object;  // return an object with username property
            }
        );

        res.json(usernames);
   }
   catch(error) {
       res.status(500).json({error: error.message});
   }
}
exports.createUser = async (req,res)=>{
    const {username,phone}= req.body;
    // console.log(username,phone);

    try{
        const newUser={username: username,phone: phone};
        console.log(newUser);
        const dbUser = await User.create(newUser)
        res.status(200).json({message: `User created successfully ${newUser}`});
    }
    catch(error) {
        res.status(400).json({error: error.message});
    }
}

exports.deleteUser=async(req,res)=>{
try {
    const id = req.params.id
    var deleteUser = await User.findByIdAndDelete({_id:id})
    res.status(200).json({
        message:"usere were deleted"    })


} catch (error) {
    res.status(400).json({error: error.message});
}
}
