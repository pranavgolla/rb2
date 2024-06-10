// controllers/productController.js
const axios = require('axios');
const Product = require('../models/productModel');

exports.initializeDatabase = async (req, res) => {
  try {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const response = await axios.get(url);
    const data = response.data;

    await Product.deleteMany({}); // Clear the collection before seeding

    const products = data.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      sold: item.sold,
      dateOfSale: new Date(item.dateOfSale)
    }));

    await Product.insertMany(products);

    res.send('Database initialized with seed data');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while initializing the database');
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching products');
  }
};
