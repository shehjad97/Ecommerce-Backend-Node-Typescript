import express from 'express';
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrderList,
  getUserOrder,
  payOrder,
} from '../controllers/order.controller';
import {
  mobileStripePayment,
  stripePay,
} from '../controllers/stripe.controller';
import { admin, auth } from '../middleware/auth';

const router = express.Router();

router.route('/').get(auth, admin, getOrderList).post(auth, createOrder);
router.route('/stripe').post(stripePay);
router.route('/stripe-mobile').post(mobileStripePayment);
router.route('/orders-user').get(auth, getUserOrder);
router
  .route('/:id')
  .get(auth, getOrderById)
  .delete(auth, deleteOrder)
  .put(auth, payOrder);

export default router;
