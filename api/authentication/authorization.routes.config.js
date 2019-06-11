const verifyUserMiddleware=require('./middlewares/verify.user.middleware');
const authorizationUserController=require('./controllers/authorization.user.controller');
const ValidationMiddleware=require('../shareable/middlewares/auth.validation.middleware');

exports.routesConfig=(app)=>{
const ValidationMiddleware=require('../shareable/middlewares/auth.validation.middleware');
    app.post('/auth',[
        verifyUserMiddleware.isAuthValidParams,
        verifyUserMiddleware.isValidUserWithPasswordMatch,
        authorizationUserController.userLogin
    ])

    app.post('/auth/refresh',[
        ValidationMiddleware.validJWTNeeded,
        ValidationMiddleware.verifyRefreshBodyField,
        ValidationMiddleware.validRefreshNeeded,
        authorizationUserController.userLogin
    ])
}
