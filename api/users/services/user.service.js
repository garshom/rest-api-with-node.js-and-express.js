const User = require('../models/users.models');
const crypto=require('crypto');


///https://medium.com/@tkssharma/writing-neat-asynchronous-node-js-code-with-promises-async-await-fa8d8b0bcd7c

exports.findByEmail= async(email)=>{
    try{
        let user=await User.find({email:email});
        return user;
    }catch(err){
        console.log(err);
    }
    
}

exports.findById= async(id)=>{
    try{
        let user=await User.findById(id);
         console.log(user)
         user=await user.toJSON();
         delete user._id; //remove the _id item
         delete user.__v; // remove the version key item
        return user;
    }catch(e){
        console.log(e)
        throw Error("Error while retrieving user data");
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

    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt).update(user.password).digest('base64');
    newUser.password=salt + "$"+hash;
    
    
    try{
        let saveduser=await newUser.save();
        return saveduser;

    }catch(e){
        console.log(' User service : '+ e);
        throw Error("Error while Creating User");
    }
    
        
}

exports.getUsers=async(query,page,limit)=>{ //limit per page
    // setup options for the mongoose paginate
    let options={
        page,
        limit
    }

    // try catch the awaited promise to handle the error
    try{
        let users=await User.paginate(query,options);
        //return the user list that was returned by the mongoose promise
        return users;
    }catch(error){
        //return an error message describing the reason
        throw Error('Error while paginating Users ::'+error)
    }
}

// return users with old promise
exports.listUsers=(page,perPage)=>{
    return new Promise((resolve,reject)=>{
            User.find()
                .limit(perPage)
                .skip(perPage*page)
                .exec((err,users)=>{
                    if(err){
                        reject(err);
                    }else{
                        console.log(users);
                        resolve(users);

                    }
                })
        }
    );
}


exports.updateUser=async (user) =>{

    let userid=user.id;
    let oldUser;
    try{
        // Find the old user Object by ID
        console.log(userid);
        oldUser=await User.findById(userid);
    }catch(e){
        throw Error('Error occured while Finding the User')
    }

    // if no old user object exists return false;
    if(!oldUser){
        return false;
    }

    console.log(oldUser);
    //Edit the User Object
    oldUser.firstName=user.firstName || oldUser.firstName;
    oldUser.lastName=user.lastName || oldUser.lastName;
    oldUser.email=user.email || oldUser.email
    oldUser.permissionLevel=user.permissionLevel || oldUser.permissionLevel;
    
    console.log(oldUser);

    try{
        let saveduser=await oldUser.save();
        return saveduser;
    }catch(e){
        throw Error('And Error occured while updating the User')
    }
}

exports.deleteUser=async (id, fn)=>{
    //Delete the User from mongodb
    
    try{
        let deleted =await User.remove({_id:id});
        console.log(deleted)
        
        return deleted;
        
    }catch(error){
        console.log(error)
        throw Error('Error occured while Deleting the User');
    }finally{

    }
}