import express from 'express';
const router = express.Router();
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
} from '../controllers/order.controller.js';
import { verifyToken, admin } from '../middleware/authMiddleware.js';

router.route('/').post(verifyToken, addOrderItems).get(verifyToken, admin, getOrders);
router.route('/mine').get(verifyToken, getMyOrders);
router.route('/:id').get(verifyToken, getOrderById);
router.route('/:id/pay').put(verifyToken, updateOrderToPaid);
router.route('/:id/deliver').put(verifyToken, admin, updateOrderToDelivered);

export default router;
