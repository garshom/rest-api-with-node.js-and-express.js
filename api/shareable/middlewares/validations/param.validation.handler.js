const { check, validationResult } = require('express-validator/check');

const ParamValidationMiddleware=require('./param.validation.middleware');

exports.createUservalidationHandler=()=>{
    return (req,res,next)=>{

        var errors = validationResult(req).formatWith(ParamValidationMiddleware.createUservalidation().errorFormatter);
        if (!errors.isEmpty()) {
            res.status(400).json(errors.array());
        } else {
            res.sendStatus(200);
        }
    }
    
}