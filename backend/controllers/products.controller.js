import products from '../data/products.js'
import Product from '../models/product.model.js'
import { errorHandler } from '../utils/error.js'


export const getProducts = async (req, res, next) => {
    const products = await Product.find({})
    if(!products){
        errorHandler(404,"No products found")
    }
    return res.status(200).json(products)
}

export const getProductbyId =  async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(product){
            return  res.status(200).json(product)
        }
    } catch (error) {
        next(error)
    }

}