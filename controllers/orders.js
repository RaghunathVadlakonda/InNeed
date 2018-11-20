const Order = require('../models/order');
const Food = require('../models/food');
const mongoose = require('mongoose');

 exports.orders_get_all = (req,res,next)=>{
    Order.find()
    .select('food quantity _id')
    .populate('food','title')
    .exec()
    .then(docs => {
        res.status(200).json({
            count : docs.length,
            orders : docs.map(doc => {
                return {
                      _id: doc._id,
                      food : doc.food,
                      quantity : doc.quantity,
                     
  
                }
            })   
           
        });
  
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        });
    })
  }

  exports.orders_create_order = (req,res,next)=>{
    Food.findById(req.body.foodId)
    .then(food => {
        if(!food){
            return res.status(404).json({
                message : 'Food not found!'
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity :req.body.quantity,
            food : req.body.foodId
        });
       return order.save() 
        
    })
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message : 'Order stored!',
            createdOrder :{
                _id:result._id,
                title: result.title,
                quantity : result.quantity
            },
          
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    }); 
}
exports.orders_get_order = (req,res,next)=>{
    Order.findById(req.params.orderId)
    .populate('food')
    .select('quantity _id')
    .exec()
    .then(order =>{
        if(!order){
            return res.status(404).json({
                message : 'Order not found!'
            });
        }
        res.status(200).json({
            order : order,
//             request:{
//                 type :'GET',
//                 url :'https://inneed-back-end.herokuapp.com/orders'
//  ,
//             }
        });
        
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
 }
 
 exports.orders_delete_order = (req,res,next)=>{
    const id = req.params.orderId;
   Order.remove({_id : id })
   .exec()
   .then(order => {
    res.status(200).json({
        message : 'Order deleted!',
        // request : {
        //     type : 'POST',
        //     url : 'https://inneed-back-end.herokuapp.com/orders',
        //     body : {
        //         productId : 'ID',
        //         quantity : 'Number'
        //     }
        // }
    })
   }) 
   .catch( err => {
    console.log(err);
    res.status(500).json({
        error : err
    });
   });
}