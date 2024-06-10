// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/initialize-db', productController.initializeDatabase);
router.get('/products', productController.getAllProducts);

module.exports = router;
