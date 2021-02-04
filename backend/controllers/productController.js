import asyncHandler from 'express-async-handler';
import CT_Product from '../models/productModel.js';

// @desc: fetch all products
// @route: GET /api/products
// @access: public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const count = await CT_Product.countDocuments({...keyword});

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
    shipping: 0,
    user: req.user._id,
    image1: '/images/sample.jpg',
    image2: '',
    image3: '',
    image4: '',
    image5: '',
    category: 'Sample category',
    countInStock: 0,
    description: 'Sample desc',
    rating: 0,
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    selectedOption: ''
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc: update a product
// @route: PUT /api/products/:id
// @access: private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, shipping, description, image1, image2, image3, image4, image5, category, countInStock, rating, option1, option2, option3, option4, selectedOption } = req.body;

  const product = await CT_Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.shipping = shipping;
    product.description = description;
    product.image1 = image1;
    product.image2 = image2;
    product.image3 = image3;
    product.image4 = image4;
    product.image5 = image5;
    product.category = category;
    product.countInStock = countInStock;
    product.rating = rating;
    product.option1 = option1;
    product.option2 = option2;
    product.option3 = option3;
    product.option4 = option4;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc: update stock of a product
// @route: PUT /api/products/:id
// @access: private
const updateStock = asyncHandler(async (req, res) => {
  const { countInStock } = req.body;

  const product = await CT_Product.findById(req.params.id);

  if (product) {
    product.countInStock = countInStock;

    const updatedStock = await product.save();
    res.json(updatedStock);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc: get top rated products
// @route: PUT /api/products/top
// @access: private/admin
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await CT_Product.find({}).sort({ rating: -1 }).limit(5);

  res.json(products);
});

// @desc: get all products
// @route: PUT /api/products/category
// @access: public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await CT_Product.find({});
  const category = req.query.category ? { name: { $regex: req.query.category, $options: 'i' } } : {};

  res.json({ products, category });
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, updateStock, getTopProducts, getAllProducts }