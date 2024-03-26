import User from '../models/user.model.js';
import { errorHandler } from '../middleware/errorMiddleware.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc authUser
// @route POST/api/users/login
// @access public
 const authUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return next(errorHandler(401, 'Wrong Credentials'));
		}

		if (user) {
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: '1d',
			});

			res.cookie('access_token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				sameSite: 'strict',
				maxAge: 1 * 30 * 24 * 60 * 60 * 1000,
			});
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			next(errorHandler(200, 'Invalid email or password'));
		}
	} catch (error) {
		next(error);
	}
};

// @desc logout USer
// @route POST/api/users/logout
// @access private
const logoutUser = async (req, res, next) => {
	res.clearCookie('access_token').status(200).json({message:"Logout Successfull"})
};
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  res.send('register user');
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  res.send('get user profile');
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  res.send('update user profile');
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
    logoutUser
};