import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js'
import bcrypt from 'bcryptjs'

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

    if(user){
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