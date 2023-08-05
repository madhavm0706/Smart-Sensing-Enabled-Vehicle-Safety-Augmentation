const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        required:[true,"Enter User Id"],
        ref:"User"
    },
   
    datetime:{
            type:Date,
            default: Date.now()

    },
    message:{
        type:String

    },
    data:{
        type:String
    },
    type:{
        type:String
    }
    

    

});

module.exports = mongoose.model('Notification', NotificationSchema);