
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config();
const app = require('./src/app')
const generateinterviewreport = require('./src/services/ai.services')


const connecttodb = require('./src/db/db')

connecttodb();





app.listen(process.env.PORT,()=>{
    console.log(`server on hai ${process.env.PORT}`)
})
