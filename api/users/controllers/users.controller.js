const UserService=require('../services/user.service');

// Async Controller function to get the User List

exports.createUser=async(req,res,next)=>{

    req.body.permissionLevel=1;
    let user={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        permissionLevel:req.body.permissionLevel

    }
    
    try{
        let createdUser=await UserService.createUser(user);
        console.log(createdUser);
        return res.status(200).json({
            status:200,
            data:createdUser,
            message:"Successfully Created User"
        })
    }catch(e){
        console.log(e);
        return res.status(400).json({
            status: 400, 
            message: "User Creation was Unsuccessfully"
        })
    }
    
}

