const mongoose = require('mongoose');
const Food = require('../models/food');
const User = require('../models/user');

exports.foods_get_all = (req, res, next) => {
    Food.find()
    .select('image title price description quantity')
    .populate('user')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            foods : docs.map(doc => {
                return {
                    title : doc.title,
                    image : 'https://inneed-back-end.herokuapp.com/public/uploads/'+doc.image,
                    price : doc.price,
                    _id   : doc._id,
                    quantity : doc.quantity,
                    description : doc.description,
                    user : doc.user,
                
                // request : {
                //     type : 'GET',
                //     url : 'https://capstone-inneed.herokuapp.com/foods' + doc._id

                //      }
                };
            })
        };
        res.status(200).json(response);
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
};


exports.foods_create_food = (req, res, next) => {
 
    const food = new Food ({
        title : req.body.title,
        price : req.body.price,  
        quantity : req.body.quantity,
        description : req.body.description,
        user: req.body.user,
        image : req.newFileName,
        _id : new mongoose.Types.ObjectId(),
     });
    
    food
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : "created food ",
            createdFood : food,
            // request : {
            //     type : "GET",
            //     url : "https://inneed-back-end.herokuapp.com/foods" + result._id
            // }
        });
    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
};

exports.foods_get_food = (req, res, next) => {
    const id =  req.params.foodId;
    Food.findById(id)
    .exec()
    .then(doc => {
        console.log("fetching data from database", doc);
        if(doc){
            res.status(200).json({
                Food : doc,
                // request : {
                //     type : 'GET',
                //     url : "https://inneed-back-end.herokuapp.com/foods" + doc._id
                // }
             });
        } else {
            // url error
            res.status(404).json({
                message : "Not a valid url"
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
             error : err
            });
    });
}
exports.foods_delete_food = (req, res, next) => {
    const id = req.params.foodId;
    Food.remove({_id : id })
    .exec()
    .then(result => {
     res.status(200).json({
         message : 'Food item deleted!',
        //  request : {
        //      type : 'POST',
        //      url : "https://inneed-back-end.herokuapp.com/foods",
        //      body : {
        //          title : 'String',
        //          price : 'Number'
        //      }
        //  }
     })
    })
    .catch( err => {
     console.log(err);
     res.status(500).json({
         error : err
     });
    });
   
}
