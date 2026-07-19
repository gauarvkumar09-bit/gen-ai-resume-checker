const jwt = require('jsonwebtoken');
const usermodel = require('../model/user.model')


const authmiddleware = async (req,res,next)=>{

    const token = req.cookies.token
 
    if(!token || token === 'null' || token === 'undefined'){
        return res.status(400).json({
            massage:"token nahi mila"
        })
    }


      let decoded ;
    try{
    decoded = jwt.verify(token,process.env.JWT_SECRET);

    req.user = decoded
    }catch(err){
        console.log(err)
        return res.status(400).json({
            massage:"unhothorize"
            
        })
    }
    const user = await usermodel.findById(decoded._id)
    if(!user){
          return res.status(400).json({
            masage:"unhothorize"

            
        })
    }

  next()



}

module.exports = authmiddleware