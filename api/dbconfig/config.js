const bluebird=require('bluebird');
const mongoose=require('mongoose')


const connectionString='mongodb://localhost:27017/api_db'; 

mongoose.Promise=bluebird;
mongoose.connect(connectionString,{ useNewUrlParser: true });
mongoose.connection.on('open',()=>{
    console.info('Database connected!');
}).on('error',(err)=>{
    console.info('Database Mongoose Connection failed')
})


module.exports={mongoose};  //Export globally

// brew services start mongodb