import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import products from './data/products.js'
import productListRouter from "./routes/products.route.js"

dotenv.config()

mongoose.connect(
	(process.env.MONGODB_URL)
).then(() => {
    console.log('Successfully connected to MongoDB');
}).catch((error) => {
    console.log(error.message);
})

const port = process.env.PORT || 3000
const app = express()

app.use(express.json());

app.use('/api/products', productListRouter)

app.listen(3000, () => {
    console.log(`Successfully running on server ${port}`);
})