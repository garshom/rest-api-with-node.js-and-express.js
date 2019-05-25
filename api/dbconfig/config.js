const bluebird=require('bluebird');
const mongoose=require('mongoose')


const connectionString=''; //MongoDb connection string

mongoose.Promise=bluebird;
mongoose.connect(connectionString,{useMongoClient:true});

module.exports={mongoose};  //Export globally