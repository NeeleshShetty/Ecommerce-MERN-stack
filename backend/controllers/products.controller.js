import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../middleware/errorMiddleware.js';

// @desc Fetch Products
// @route GET/api/products/page
// @access public
export const getProducts = async (req, res, next) => {
	const pageSize = 1;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? { name: { $regex: req.query.keyword, $options: 'i' } }
		: {};
	try {
		const count = await Product.countDocuments({ ...keyword });

		const products = await Product.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1));

		if (!products) {
			return errorHandler(404, 'No products found');
		}
		res
			.status(200)
			.json({ products, page, pages: Math.ceil(count / pageSize) });
	} catch (error) {
		next(error);
	}
};

// // @desc Fetch Products
// // @route GET/api/products
// // @access public
// export const getProducts = async (req, res, next) => {
// 	try {
// 		const products = await Product.find({});

// 		if (!products) {
// 			return errorHandler(404, 'No products found');
// 		}
// 		return res.status(200).json({ products });
// 	} catch (error) {
// 		next(error);
// 	}
// };

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
		description: 'Sample description',
	});

	const createdProduct = await product.save();

	res.status(200).json(createdProduct);
	try {
	} catch (error) {
		next(error);
	}
};

// @desc update a Product
// @route PUT/api/products/:id
// @access Private/Admin
export const updateProduct = async (req, res, next) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	try {
		const product = await Product.findById(req.params.id);

		if (product) {
			product.name = name;
			product.price = price;
			product.image = image;
			product.brand = brand;
			product.category = category;
			product.countInStock = countInStock;
			product.description = description;
		}

		const updatedProduct = await product.save();

		res.status(200).json(updatedProduct);
	} catch (error) {
		next(error);
	}
};

// @desc Delete a Product by Id
// @route DELETE/api/products/:id
// @access Private/Admin
export const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			await Product.deleteOne({ _id: product._id });
			res.status(200).json({ message: 'Product Deleted Successfully' });
		}
	} catch (error) {
		next(error);
	}
};

// @desc create new review
// @route POST/api/products/:id/reviews
// @access Private
export const createProductReview = async (req, res, next) => {
	const { rating, comment } = req.body;

	try {
		const product = await Product.findById(req.params.id);
		const user = await User.findById(req.user.id);

		if (product) {
			const alreadyReviewed = product.reviews.find(
				(product) => product.user.toString() === req.user.id.toString()
			);

			if (alreadyReviewed) {
				res.status(400);
				throw new Error('Product already reviewed by You');
			}

			const review = {
				name: user.name,
				rating: Number(rating),
				comment,
				user: req.user.id,
			};

			product.reviews.push(review);

			product.numReviews = product.reviews.length;

			product.rating =
				product.reviews.reduce((acc, item) => item.rating + acc, 0) /
				product.reviews.length;

			await product.save();
			res.status(201).json({ message: 'Review added' });
		}
	} catch (error) {
		next(error);
	}
};
