import express from 'express'
import { getProducts,getProductbyId, createProduct, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import {verifyToken,admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/', getProducts);
router.get('/:id', getProductbyId)
router.post('/', verifyToken, admin, createProduct);
router.put('/:id', verifyToken, admin, updateProduct)
router.delete('/:id',verifyToken,admin,deleteProduct)

export default router