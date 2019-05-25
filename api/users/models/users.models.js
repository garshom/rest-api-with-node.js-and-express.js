const {mongoose}=require('../../dbconfig/config');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    permissionLevel:{type:Number,required:true}
})

userSchema.set('toJSON',{virtuals:true});

userSchema.findById=function(cb){
    return this.model('Users').find({id:this.id},cb)
}

const userModel=mongoose.model('Users',userSchema);

module.exports=userModel;