const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true 
    });
    const connection = mongoose.connection.on('connected',()=>{
        console.log('connected to mongoose');
    })
    mongoose.connection.on('error',(err)=>{
        console.log("error while connecting",err)
    })
}

module.exports = connectDatabase;