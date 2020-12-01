import express from 'express';
import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, updateStock, getTopProducts, getAllProducts } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct);
router.get('/category', getAllProducts);
router.get('/top', getTopProducts);
router.route('/:id')
  .get(getProductById)
  .put(protect, updateStock)
  .delete(protect, admin, deleteProduct);

router.route('/edit/:id')
  .put(protect, admin, updateProduct)
  
export default router