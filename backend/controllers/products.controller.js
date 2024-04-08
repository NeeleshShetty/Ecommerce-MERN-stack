import products from '../data/products.js';
import Product from '../models/product.model.js';
import { errorHandler } from '../middleware/errorMiddleware.js';

// @desc Fetch Products
// @route GET/api/products
// @access public
export const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find({});
		if (!products) {
			return errorHandler(404, 'No products found');
		}
		return res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

// @desc Fetch a product by ID
// @route GET/api/products/:id
// @access public
export const getProductbyId = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			return res.status(200).json(product);
		}
	} catch (error) {
		next(error);
	}
};


// @desc create a Product
// @route Post/api/products
// @access Private/Admin
export const createProduct = async (req, res, next) => {
	const product = new Product({
		
		name: 'Sample Name',
		price: 0,
		user: req.user.id,
		image: '/images/sample.jpg',
		brand: 'Sample Brand',
		category: 'Sample Category',
		countInStock: 0,
		numReviews: 0,
		description:'Sample description'
	})

	const createdProduct = await product.save()

	res.status(200).json(createdProduct)
	try {
		
	} catch (error) {
		next(error);
	}
};