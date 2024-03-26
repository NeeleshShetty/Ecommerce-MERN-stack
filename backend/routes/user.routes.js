import express from 'express'
import { authUser,registerUser,getUsers,logoutUser,getUserProfile,getUserById,deleteUser,updateUser,updateUserProfile } from '../controllers/user.controller.js'
import { verifyToken,admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(verifyToken, admin, getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
	.route('/profile')
	.get(verifyToken, getUserProfile)
	.put(verifyToken, updateUserProfile);
router
	.route('/:id')
	.delete(verifyToken, admin, deleteUser)
	.get(verifyToken, admin, getUserById)
	.put(verifyToken, admin, updateUser);

export default router