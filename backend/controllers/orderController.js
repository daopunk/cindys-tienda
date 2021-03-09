import asyncHandler from 'express-async-handler';
import CT_Order from '../models/orderModel.js';

// @desc: create order
// @route: POST /api/orders
// @access: private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (orderItems && orderItems.lenght === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new CT_Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc: get order by id
// @route: GET /api/orders/:id
// @access: private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await CT_Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }

});

// @desc: update order to paid
// @route: GET /api/orders/:id/pay
// @access: private
const updateOrderPaid = asyncHandler(async (req, res) => {
  const order = await CT_Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

  const updatedOrder = await order.save();
  res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc: update order to deleivered
// @route: GET /api/orders/:id/deliver
// @access: private/admin
const updateOrderDelivered = asyncHandler(async (req, res) => {
  const order = await CT_Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc: get logged in user orders
// @route: GET /api/orders/getorders
// @access: private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await CT_Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc: get all orders
// @route: GET /api/orders/
// @access: private/admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await CT_Order.find({}).populate('user', 'id name');
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderPaid, updateOrderDelivered, getOrders, getAllOrders }