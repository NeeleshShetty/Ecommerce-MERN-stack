import Order from '../models/order.model.js';
import { errorHandler } from '../middleware/errorMiddleware.js';
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res,next) => {
	const { orderItems, user, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
	
	if (orderItems && orderItems.length === 0) {
		return next(errorHandler(400,"No order Items"))
	} else {
		const order = new Order({
			orderItems: orderItems.map((item) => ({
				...item,
				product: item._id,
				_id:undefined
			})),
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createOrder = await order.save()

		res.status(201).json(createOrder)
	}
};


// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res,next) => {
	const orders = await Order.find({ user: req.user._id })
	res.status(201).json(orders)
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res,next) => {
	const order = await Order.findById(req.params.id).populate('user', 'name email')
	
	if (order) {
		res.status(200).json(order)
	} else {
		next(errorHandler(404,'Order not found'))
	}
};

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res,next) => {
	res.send('update order to paid');
};

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res,next) => {
	res.send('update order to delivered');
};



// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res,next) => {
	res.send('get all orders');
};

export {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
};
