const UserService=require('../services/user.service');

// Async Controller function to create a new User
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

exports.getUserById=async(req,res)=>{
    
    try{
        let id=req.body.id;
        console.log(id);
        let user=await UserService.findById(id);
        console.log(user)
        return res.status(201).json({
            status:201,
            data:user,
            message:"Successfully fetched User"
        })

    }catch(error){
        console.log(error);
        return res.status(400).json({
            status:400,
            message:error.message
        })

    }
}

// Asycn function to get Users with Paginate option

exports.getUsers=async(req,res)=>{
    //check the existence of the query parameters, if doesn't exist assign a default value
    let page= req.query.page ? req.query.page : 1;
    let limit=req.query.limit ? req.query.limit : 10;

    try{
        let users=await UserService.getUsers({},page,limit);
        // Return the user list with the appropriate HTTP status code
        return res.status(200).json({
            status:200,
            data:users,
            message:"Successfully Users Received"
        })
    }catch(error){
        // Return an error response message with the code and the Error Message to Api caller
        return res.status(400).json({
            status:400,
            message:error.message
        })
    }
}

exports.listUsers= async(req,res)=>{
    let limit=req.query.limit && req.query.limit<=100 ? parseInt(req.query.limit):10;
    let page=0;
    if(req.query){
        if(req.query.page){
           // req.query.page=parseInt(req.query.page);
            page=Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    try{
        let users=await UserService.listUsers(page,limit);
        
        return res.status(200).json({
            status:200,
            data:users,
            message:"Successfully Users Received"
        })
        
    }catch(error){
        // Return an error response message with the code and the Error Message to Api caller
        return res.status(400).json({
            status:400,
            message:error.message
        })
    }
    
}

exports.updateUser=async (req,res,next)=>{
    //Id is necessary for the update of the user
    if(!req.body.id){
        return res.status(400).json({
            status:400,
            message:'Id must be presented to update a user'
        })
    }else{
        let id = req.body.id;
        let user={
            id,
            firstName:req.body.firstName || null,
            lastName: req.body.lastName || null,
            email:req.body.email || null,
            permissionLevel:req.body.permissionLevel || null
        };

        console.log(user);

        try{
            let updateuser=await UserService.updateUser(user);
            return res.status(200).json({
                status:200,
                data:updateuser,
                message:'Successfully updated User'
            })
        }catch(e){
            return res.status(400).json({
                status:400,
                message:e.message
            })
        }
    }

    
}

exports.removeUser=async (req,res,next)=>{
    let id=req.params.id;
    try{
        let deleted=await UserService.deleteUser(id);
        if(deleted.deletedCount===0){
            return res.status(400).json({
                status:400,
                message:'User Could not be deleted'
            })
        }else{
            return res.status(204).json({
                status:204,
                message:'Successfully deleted User'
            })
        }
        
    }catch(err){
        return res.status(400).json({
            status:400,
            message:err.message
        })
    }
}


