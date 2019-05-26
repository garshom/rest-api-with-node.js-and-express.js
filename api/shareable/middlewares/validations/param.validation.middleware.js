
const { check, validationResult } = require('express-validator/check');

exports.createUservalidation=()=>{

    return {
            validateMeChecks: [
                check('username')
                    .isLength({ min:10 }).withMessage('Login is a required field.')
                    .isAlphanumeric().withMessage('Login must be alphanumeric.'),
        
                check('password')
                    .isLength({ min:8 }).withMessage('Password must be at least 8 characters in length.')
                    .matches('[0-9]').withMessage('Password must contain at least 1 number.')
                    .matches('[a-z]').withMessage('Password must contain at least 1 lowercase letter.')
                    .matches('[A-Z]').withMessage('Password must contain at least 1 uppercase letter.')
                    .custom((value, {req, loc, path}) => {
                        if (value !== req.body.confirmPassword) {
                            return false;
                        } else {
                            return value;
                        }
                    }).withMessage("Passwords don't match."),
            ],
            errorFormatter: ({location, msg, param, value, nestedErrors}) => {
                    return {
                        type: "Error",
                        name: "Signup Failure",
                        location: location,
                        message: msg,
                        param: param,
                        value: value,
                        nestedErrors: nestedErrors,
                    }
            }
        
        
    }

}



