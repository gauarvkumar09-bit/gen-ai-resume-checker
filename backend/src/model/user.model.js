const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userschema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        
    },
    password:{
        type:String,
        required:true,
        select:false
        

    },
    username:{
        type:String,
        required:true,

    }
},{
    timestamps:true
})


userschema.pre('save', async function() {
    // Agar password modify nahi hua toh direct return kar jao (Mongoose samajh jayega)
    if (!this.isModified('password')) return; 
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
    } catch (error) {
        throw error; // next(error) ki jagah direct error throw karo
    }
});

userschema.methods.comparepassword = async function(password){
  return await  bcrypt.compare(password,this.password)
}

userschema.methods.generatetoken = async function(){
   const token =  jwt.sign({_id:this._id,email:this.email},process.env.JWT_SECRET,{expiresIn:'1d'})
   return token
}

const usermodel = mongoose.model('user',userschema)

module.exports = usermodel