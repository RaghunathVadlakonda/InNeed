const express = require("express");
const router  = express.Router();
const mongoose = require("mongoose");
const multer = require('multer'); 
const checkAuth = require('../middleware/check-auth');

const MedicinesController = require('../controllers/medicines');




// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
   filename: function(req, file, callback) {
    req.newFileName = new Date().toISOString() + file.originalname;
    callback(null, req.newFileName);
  }
});

const fileFilter = (req, file, callback) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
// stores in uploads folder
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});





//...............Medicine Routes.................

router.get('/',MedicinesController.medicines_get_all);

router.post('/',upload.single('image'), MedicinesController.medicines_create_medicine);

router.get('/:medicineId',checkAuth,MedicinesController.medicines_get_medicine);

// router.patch('/:foodId',FoodsController.foods_update_food);

router.delete('/:medicineId',checkAuth,MedicinesController.medicines_delete_medicine);






module.exports = router;
