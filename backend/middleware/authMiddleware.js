import jwt from 'jsonwebtoken'
import { errorHandler } from './errorMiddleware.js'

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token
    
    if (!token) {
        return next(errorHandler(401, 'You are not authenticated'))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) return next(errorHandler(403, 'Token is not valid'))
        
        req.user = user
        next()
    })
}

// Admin auth

export const admin = (req, res, next) => {
if (req.user || req.user.isAdmin) {
        next()
    } else {
        return next(errorHandler(401,'Your not the admin'))
    }
}