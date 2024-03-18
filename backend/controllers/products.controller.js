import products from '../data/products.js'
export const productsList = async (req, res, next) => {
    res.status(200).json(products)
}