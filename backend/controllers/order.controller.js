import Order from '../models/order.model.js';
import { errorHandler } from '../middleware/errorMiddleware.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res, next) => {
	const {
		orderItems,
		user,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	try {
		if (orderItems && orderItems.length === 0) {
			return next(errorHandler(400, 'No order Items'));
		} else {
			const order = new Order({
				orderItems: orderItems.map((item) => ({
					...item,
					product: item._id,
					_id: undefined,
				})),
				user: user,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
			});

			const createOrder = await order.save();

			res.status(201).json(createOrder);
		}
	} catch (error) {
		next(error);
	}
};

// @desc    Get logged in user orders
// @route   GET /api/orders/mine
// @access  Private
const getMyOrders = async (req, res, next) => {
	try {
		 const orders = await Order.find({user:req.user.id})
		res.status(201).json(orders);
	} catch (error) {
		next(error);
	}
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
	try {
		const order = await Order.findById(req.params.id).populate(
			'user',
			'name email'
		);

		if (order) {
			res.status(200).json(order);
		} else {
			next(errorHandler(404, 'Order not found'));
		}
	} catch (error) {
		next(error);
	}
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res,next) => {
	try {
		const order = await Order.findById(req.params.id);
	
		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address,
			};
	
			const updatedOrder = await order.save();
	
			res.json(updatedOrder);
		} else {
			res.status(404);
			throw new Error('Order not found');
		}
	} catch (error) {
		next(error)
	}
};

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
	res.send('update order to delivered');
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res, next) => {
	try {
		const orders = await Order.find({}).populate('user', 'id name')
		res.status(200).json(orders)
	} catch (error) {
		next(error)
	}
};

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
};
