import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import productRoutes from "./routes/products.route.js"
import userRoutes from './routes/user.routes.js'
import orderRoutes from './routes/orders.route.js'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'

dotenv.config()

connectDB();

const port = process.env.PORT || 3000
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);




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