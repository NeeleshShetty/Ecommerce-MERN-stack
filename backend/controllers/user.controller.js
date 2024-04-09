import User from '../models/user.model.js';
import { errorHandler } from '../middleware/errorMiddleware.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc authUser
// @route POST/api/users/login
// @access public
 const authUser = async (req, res, next) => {
	 const { name, password } = req.body;
	try {
		const user = await User.findOne({ name });
		if (!user) return next(errorHandler(404, 'User not found'));

		// const useremail = await User.findOne({ email });
		// if (!useremail) return next(errorHandler(404, 'User not found'));

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) return next(errorHandler(401, 'wrong credentials'));

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

		const { password: hashedPassword, ...rest } = user._doc;
		const expiryDate = new Date(Date.now() + 3600000); // 1 hour
		res
			.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
			.status(200)
			.json(rest);
	} catch (error) {
		next(error);
	}
};

// @desc logout USer
// @route POST/api/users/logout
// @access private
const logoutUser = async (req, res, next) => {
	res
		.clearCookie('access_token')
		.status(200)
		.json({ message: 'Logout Successfull' });
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res,next) => {
	const { name, password, email } = req.body;
	const user = await User.findOne({ name })
	if (user) {
		return res.json({message:"Username already exsists"})
	}
		const hashPassword = bcrypt.hashSync(password, 10);
		const newUser = new User({ name, password: hashPassword, email });

		try {
			await newUser.save();
			res.status(200).json({ message: 'New user created!' });
		} catch (error) {
			next(error);
		}
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res, next) => {
	// res.send("user profile")
	
	try {
		const user = await User.findById(req.user.id)
		console.log(req.user.id);
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		}
	} catch (error) {
		next(error)
	}
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res,next) => {
	try {
		const user = await User.findById(req.user.id)
		if (user) {
			user.name =  req.body.name || user.name
			user.email = req.body.email || user.email

			if (req.body.password) {
				user.password = req.body.password
				user.password = bcrypt.hashSync(user.password,10)
			}
			const updatedUser = await user.save()
		

			res.status(200).json({
				_id:updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin:updatedUser.isAdmin
			})
		}
	} catch (error) {
		next(error)
	}
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
	res.send('get users');
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
	res.send('delete user');
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
	res.send('get user by id');
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
	res.send('update user');
};

export {
	authUser,
	registerUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
	logoutUser,
};
