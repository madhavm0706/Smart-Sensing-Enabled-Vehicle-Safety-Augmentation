const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.ObjectId,
        required:[true,"Enter User Id"],
        ref:"User"
    },

    memberdetails:[{
        name:{
            type:String,

    },
    phoneno:{
        type:String

    },
    sex:{
        type:String,
    },
    age:{
        type:String,
    },
    bloodgrp:{
        type:String
    },
    address:{
        type:String,
    },
    city:{
        type:String
    },
    pincode:{
        type:String
    }
   
    }

    ]
   
   
    

    

});

module.exports = mongoose.model('Member', MemberSchema);