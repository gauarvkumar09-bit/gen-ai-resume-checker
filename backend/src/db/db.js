const mongoose = require('mongoose')


const connecttodb = async ()=>{

    try{   await mongoose.connect(process.env.MONGO_URI)
        console.log('db se connect ho gya')
}catch(err){
    console.log(err)
}


    
}

module.exports = connecttodb