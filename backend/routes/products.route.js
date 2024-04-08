import express from 'express'
import { getProducts,getProductbyId, createProduct } from '../controllers/products.controller.js';
import {verifyToken,admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.get('/', getProducts);
router.get('/:id', getProductbyId)
router.post('/', verifyToken, admin, createProduct);

export default router