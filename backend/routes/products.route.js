import express from 'express'
import { getProducts,getProductbyId } from '../controllers/products.controller.js';

const router = express.Router()

router.get('/getProducts', getProducts);
router.get('/getProduct/:id',getProductbyId)

export default router