const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
 food : { type :mongoose.Schema.Types.ObjectId, ref :'Food', required : true},
 quantity : {type :Number, default : 0}

});
module.exports = mongoose.model('Order',orderSchema); 
