const mongoose = require('mongoose');
const Medicine = require('../models/medicine');
const User = require('../models/user');
exports.medicines_get_all = (req, res, next) => {
    Medicine.find()
    .select('image title price description quantity')
    .populate('user')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            medicines : docs.map(doc => {
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
                //     url : 'https://inneed-back-end.herokuapp.com/medicines/' + doc._id

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



exports.medicines_create_medicine = (req, res, next) => {
    const medicine = new Medicine ({
        title : req.body.title,
        price : req.body.price,
        quantity : req.body.quantity,
        description : req.body.description,
        user: req.body.user,
        image : req.newFileName,
        _id : new mongoose.Types.ObjectId(),
     });
    medicine
    .save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message : "created medicine",
            createdMedicine : medicine,
            // request : {
            //     type : "GET",
            //     url : "https://inneed-back-end.herokuapp.com/medicines/" + result._id
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

exports.medicines_get_medicine = (req, res, next) => {
    const id =  req.params.medicineId;
    Medicine.findById(id)
    .exec()
    .then(doc => {
        console.log("fetching data from database", doc);
        if(doc){
            res.status(200).json({
                Medicine : doc,
                // request : {
                //     type : 'GET',
                //     url : "https://inneed-back-end.herokuapp.com/medicines/" + doc._id
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
 

exports.medicines_delete_medicine = (req, res, next) => {
    const id = req.params.medicineId;
    Medicine.remove({_id : id })
    .exec()
    .then(result => {
     res.status(200).json({
         message : 'Medicine item deleted!',
        //  request : {
        //      type : 'POST',
        //      url : "https://inneed-back-end.herokuapp.com/medicines",
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
