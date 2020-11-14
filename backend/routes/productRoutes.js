import express from 'express';
import asyncHandler from 'express-async-handler';
import CT_Product from '../models/productModel.js';

const router = express.Router();

// @desc: fetch all products
// @route: GET /api/products
// @access: public
router.get('/', asyncHandler(async (req,res) => {
  const products = await CT_Product.find({});

  res.json(products);
}));

// @desc: fetch a product
// @route: GET /api/products/:id
// @access: public
router.get('/:id', asyncHandler(async (req,res) => {
  const product = await CT_Product.findById(req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
}));

export default router