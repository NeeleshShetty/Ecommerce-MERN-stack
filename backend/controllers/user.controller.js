import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// @desc authUser
// @route POST/api/users  
// @access public
export const authUser = async (req, res, next) => {
    const {email,password} = req.body
    
    const user = await User.findOne({email})
    const validPassword = bcrypt.compareSync(password , user.password)

    if(!validPassword){
            return next(errorHandler(401,'Wrong Credentials'))
    }

    if (user) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn:'1d'
        })

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: 'strict',
            maxAge: 1 * 30 * 24 * 60 * 60 * 1000 
        })
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        next(errorHandler(200,"Invalid email or password"))
    }

    
}   