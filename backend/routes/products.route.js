import express from 'express'
import {
	getProducts,
	getProductbyId,
	createProduct,
	updateProduct,
	deleteProduct,
	createProductReview,
	getProductsAdmin,
	getTopProducts,	
} from '../controllers/products.controller.js';
import {verifyToken,admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/', getProducts);
router.get('/top',getTopProducts)
router.get('/page',verifyToken,admin, getProductsAdmin)
router.get('/:id', getProductbyId)
router.post('/', verifyToken, admin, createProduct);
router.put('/:id', verifyToken, admin, updateProduct)
router.delete('/:id',verifyToken,admin,deleteProduct)
router.post('/:id/review',verifyToken,createProductReview)
export default router