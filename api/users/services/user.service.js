const {User} = require('../models/users.models');
const crypto=require('crypto');


///https://medium.com/@tkssharma/writing-neat-asynchronous-node-js-code-with-promises-async-await-fa8d8b0bcd7c

exports.findByEmail= async(email)=>{
    return User.find({email:email});
}

exports.findById= async(id)=>{
    try{
        let result=await User.findById(id);
        result=await result.toJSON();
        await delete result._id; //remove the _id item
        await delete result.__v; // remove the version key item

        return result;
    }catch(e){
        console.log(e)
    }

}

exports.createUser=async(user)=>{
    
    //creating a new mongose object by using the new keyword 
    let newUser=new User({
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        permissionLevel:user.permissionLevel
    })

    let salt = await crypto.randomBytes(16).toString('base64');
    let hash = await crypto.createHmac('sha512',salt).update(user.password).digest('base64');

    newUser.password=salt + "$"+hash;
    try{
        // saving the user using mongoose
        let saveduser=await newUser.save();
        return saveduser;

    }catch(e){
        console.log(e)
    }
}