const ProductModel = require('../models/Products.js');

const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.getProducts();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products: ', err);
    res.status(500).send('Internal Server Error')
  }
}

module.exports = { getProducts };