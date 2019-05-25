const jwt=require('jsonwebtoken');
const secret=require('../config/env.config')['jwt_secret_key'];

const API_ADMIN_PERMISSION=2056;

exports.minimumPermissionLevelRequired=(required_permission_level)=>{

    return (req,res,next)=>{
        let user_permission_level=parseInt(req.jwt.permissionLevel);
        let userId=req.jwt.userId;
        if(user_permission_level & required_permission_level){
            return next();
        }else{
            return res.status(403).send();
        }
    }
}

exports.onlySameUserOrApiAdminCanDoThisAction=(req,res,next)=>{
    let user_permission_level=parseInt(req.jwt.permissionLevel);
    let userId=req.jwt.userId;

    if(req.params && req.params.userId && userId===req.params.userId){
        return next();
    }else{
        if(user_permission_level & API_ADMIN_PERMISSION){
            return next();
        }else{
            return res.status(403).send();
        }
    }
}

exports.sameUserCantDoThisAction=(req,res,next)=>{
    let userId = req.jwt.userId;

    if (req.params.userId !== userId) {
        return next();
    } else {
        return res.status(400).send();
    }
}