const UserService=require('../services/user.service');

// Async Controller function to get the User List

exports.createUser=async(req,res,next)=>{
    // Reg.Body contains the api submit value

    req.body.permissionLevel=1;
    let user={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
        permissionLevel:req.body.permissionLevel

    }
    console.log(user);
    try{
        // Invoking the service function with the new Object from the Request body
        let createdUser=await UserService.createUser(user);
        return res.status(200).json({
            status:200,
            data:createdUser,
            message:"Successfully Created User"
        })
    }catch(e){
        console.log(e)

        return res.status(400).json({
            status: 400, 
            message: "User Creation was Unsuccessfully"
        })
    }
}