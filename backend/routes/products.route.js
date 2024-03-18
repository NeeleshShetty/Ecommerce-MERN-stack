import express from 'express'
import { productsList } from '../controllers/products.controller.js';

const router = express.Router()

router.get('/productslist', productsList);

export default router