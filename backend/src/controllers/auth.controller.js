const usermodel = require('../model/user.model')


const register = async (req,res)=>{

    try{
const {email,password,username} =req.body;



const isuseralredyexist = await usermodel.findOne({email})

if(isuseralredyexist){
    return res.status(400).json({
        massage:'user alredy exist'
    })
}

const user = await usermodel.create({email,password,username})

const token = await user.generatetoken()
res.cookie('token',token)

return res.status(200).json({
    massage:'user creted succesfully',
    name:user.name,
    email:user.email,
    token:token
})
    }catch(err){
        console.log(err)
    }

}

const login = async (req,res)=>{

    const {password,email}= req.body;

    const user = await usermodel.findOne({email}).select('+password');


     const ismatch = await user.comparepassword(password)


      if(!ismatch){
        return res.status(400).json({
            massage:'wrong password or email'
        })
    }


    if(!user){
        return res.status(400).json({
            massage:'user not found'
        })
    }

    
const token = await user.generatetoken()
res.cookie('token',token)

   return res.status(200).json({
    masaage:"login sucees full",
    token:token,
     name:user.name,
    email:user.email,
   })

}

const logout = async  (req,res)=>{

res.clearCookie('token')

}

const getme = async (req,res)=>{
    const user= await usermodel.findById(req.user._id) 


    res.status(200).json({
        user:{
            id:user._id,
            usename:user.username,
            email:user.email
        }
    })
}


module.exports= {register,login ,logout ,getme}