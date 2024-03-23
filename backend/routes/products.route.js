import express from 'express'
import { getProducts,getProductbyId } from '../controllers/products.controller.js';

const router = express.Router()

router.get('/', getProducts);
router.get('/:id',getProductbyId)

export default router