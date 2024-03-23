import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import products from './data/products.js'
import productRoutes from "./routes/products.route.js"
import connectDB from './config/db.js';

dotenv.config()

connectDB();

const port = process.env.PORT || 3000
const app = express()

app.use('/api/products', productRoutes);

app.use(express.json());


app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error'
    return res.status(statuscode).json({
        success: false,
        message,
        statuscode
    })
})


app.listen(3000, () => {
    console.log(`Successfully running on server ${port}`);
})