const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    },
  
    description:{ 
        type : String,
        required : true
    },
    image: {
        type: String,
        required : true
        
    },
    user :{ type :mongoose.Schema.Types.ObjectId,
            ref :'User', 
            required : true
        },  
    date : {
        type : Date,
        default : Date.now
    },
},
    {
        collection: 'foods'
    
     }

);

module.exports = mongoose.model("Food", foodSchema);