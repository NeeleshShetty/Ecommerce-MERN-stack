import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import products from './data/products.js'
import productListRouter from "./routes/products.route.js"
import connectDB from './config/db.js';

dotenv.config()

connectDB();

const port = process.env.PORT || 3000
const app = express()

app.use(express.json());

app.use('/api/products', productListRouter)

app.listen(3000, () => {
    console.log(`Successfully running on server ${port}`);
})