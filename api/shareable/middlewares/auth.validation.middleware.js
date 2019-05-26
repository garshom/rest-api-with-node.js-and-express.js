const jwt=require('jsonwebtoken');
const secret_key=require('../config/env.config').jwt_secret_key;
const crypto=require('crypto');


exports.verifyRefreshBodyField=(req,res,next)=>{
    if(req.body && req.body.refresh_token){
        return next();
    }else{
        return res.status(400).send({
            status:400,
            error:"You need to pass refresh_token field"
        })
    }
}

exports.validRefreshNeeded=(req,res,next)=>{
    let b=new Buffer(req.body.refresh_token,'base64');
    let refresh_token=b.toString();
    let hash=crypto.createHmac('sha512',req.jwt.refreshKey).update(req.jwt.userId+secret_key).digest('base64');
    if(hash===refresh_token){
        req.body=req.jwt;
        return next();
    }else{
        return res.status(400).send({
            status:400,
            error:"Invalid refresh token"
        })
    }
}

exports.validJWTNeeded=(req,res,next)=>{
    if(req.headers['authorization']){
        try{
            let authorization=req.headers['authorization'].split(' ');
            if(authorization[0]!=='Bearer'){
                return res.status(401).send();
            }else{
                req.jwt=jwt.verify(authorization[1],secret_key);
                return next();
            }
        }catch(error){
            res.status(403).send({
                status:403,
                error:'Forbidden HTTP user'
            });
        }
    }else{
        return res.status(401).send({
            status:401,
            error:'Unauthorized HTTP user'
        });
    }
}
