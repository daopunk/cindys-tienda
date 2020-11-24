import express from 'express';
import { addOrderItems, getOrderById, updateOrderPaid, getOrders, getAllOrders, updateOrderDelivered } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
router.route('/getorders').get(protect, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderDelivered);

export default router