const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        required:[true,"Enter User Id"],
        ref:"User"
    },
   
    
    carno:{
        type:String

    },
    carname:{
        type:String
    },
    carowner:{
        type:String
    }
    

    

});

module.exports = mongoose.model('Car', CarSchema);