import asyncHandler from 'express-async-handler';
import CT_Product from '../models/productModel.js';

// @desc: fetch all products
// @route: GET /api/products
// @access: public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const count = await CT_Product.countDocuments({ ...keyword });

  const products = await CT_Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc: fetch a product
// @route: GET /api/products/:id
// @access: public
const getProductById = asyncHandler(async (req, res) => {
  const product = await CT_Product.findById(req.params.id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc: delete a product
// @route: DELETE /api/products/:id
// @access: private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await CT_Product.findById(req.params.id);
  
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc: create a product
// @route: POST /api/products/
// @access: private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new CT_Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    featureImage: '/images/sample.jpeg',
    category: 'Sample category',
    countInStock: 0,
    description: 'Sample desc'
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc: update a product
// @route: PUT /api/products/:id
// @access: private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, featureImage, category, countInStock } = req.body;

  const product = await CT_Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.featureImage = featureImage;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc: get top rated products
// @route: PUT /api/products/top
// @access: private/admin
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await CT_Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, getTopProducts }