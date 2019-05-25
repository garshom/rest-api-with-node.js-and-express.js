const UserController = require('../users/controllers/users.controller');
const ValidationMiddleware=require('../shareable/middlewares/auth.validation.middleware');
const PermissionMiddleware=require('../shareable/middlewares/auth.permission.middleware');
const config=require('../shareable/config/env.config');

const ADMIN=config.permissionLevels.API_ADMIN;
const APIUSER=config.permissionLevels.API_USER;
const FREE=config.permissionLevels.NORMAL_USER;

exports.routesConfig=function(app){
    app.post('/users',[
        UserController.createUser
    ]);

}
