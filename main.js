const config=require('./api/shareable/config/env.config');
const express=require('express');
const bodyParser=require('body-parser');
const UsersRoutes=require('./api/routes/users.routes.config');
const AuthorizationRoutes=require('./api/authentication/authorization.routes.config');

const router = express.Router()

const app=express();

app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

    if(req.method==='OPTIONS'){
        return res.status(200).send();
    }else{
        return next();
    }
});
AuthorizationRoutes.routesConfig(app);
UsersRoutes.routesConfig(app);

app.listen(config.port,config.host,function(){
    console.log(`Server successfully started at:${config.host}:${config.port}`);
})