
const UserController = require('../users/controllers/users.controller');
const ValidationMiddleware=require('../shareable/middlewares/auth.validation.middleware');
const PermissionMiddleware=require('../shareable/middlewares/auth.permission.middleware');
const config=require('../shareable/config/env.config');

const ParamValidationMiddleware=require('../shareable/middlewares/validations/param.validation.middleware');
const ParamValidationHandler=require('../shareable/middlewares//validations/param.validation.handler');
const { check, validationResult } = require('express-validator/check');

const ADMIN=config.permissionLevels.API_ADMIN;
const APIUSER=config.permissionLevels.API_USER;
const FREE=config.permissionLevels.NORMAL_USER;

exports.routesConfig=function(app){
    app.post('/users',[
        UserController.createUser
    ]);

    app.post('/api',
    [ParamValidationMiddleware.createUservalidation().validateMeChecks],
    [ParamValidationHandler.createUservalidationHandler()]);

    app.get('/users',[
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UserController.listUsers
        
    ]);

    app.get('/users/:userId',[
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        ///PermissionMiddleware.onlySameUserOrApiAdminCanDoThisAction,
        UserController.getUserById
    ])

    app.patch('/users/:userId',[
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        ///PermissionMiddleware.onlySameUserOrApiAdminCanDoThisAction,
        UserController.updateUser
    ])

    app.delete('/users/:userId',[
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        UserController.removeUser
    ])




}
