const UserService=require('../../users/services/user.service');
const crypto=require('crypto');

exports.isAuthValidParams=(req,res,next)=>{
    let errors=[];
    
    if(req.body){
        if(!req.body.email){
            errors.push('Missing email parameter')
        }

        if(!req.body.password){
            errors.push('Missing password parameter')
        }

        if(errors.length){
            console.log(errors)
            return res.status(400).send({
                errors:errors.join(',')
            })
        }else{
            return next();
        }
    }else{
        return res.status(400).send({
            errors:'Missing email and password parameters'
        })
    }
}

exports.isValidUserWithPasswordMatch=(req,res,next)=>{
    UserService.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({error:'Requested User does not exist!'})
            }else{
                let passwordParam=user[0].password.split('$');
                let salt=passwordParam[0];
                let hash=crypto.createHmac('sha512',salt).update(req.body.password).digest('base64');
                if(hash===passwordParam[1]){
                    req.body={
                        userId:user[0]._id,
                        email:user[0].email,
                        permissionLevel:user[0].permissionLevel,
                        provider:'email',
                        name:user[0].firstName + ' '+ user[0].lastName,
                    }
                    console.log(req.body);
                    return next();
                }else{
                    return res.status(400).send({
                        errors:['Invalid email or password']
                    })
                }
            }
        })
}