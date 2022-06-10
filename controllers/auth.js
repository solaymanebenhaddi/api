import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const register = async(req,res,next)=>{
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.passeword, salt);
        const newUser = new User({
            //this code below mean that wel take all field of user and alsoe [password ] too
            ...req.body,
            passeword:hash,
        })
        await newUser.save();
        res.status(200).send("User has been created")
    } catch (error) {
        next(error)
        
    }
}
export const login = async(req,res,next)=>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found"))
        // we have import here bcryptjs library for securing pw : nom i bcryptjs
        const isPasswordCorrect = await bcrypt.compare(req.body.passeword, user.passeword)
        if(!isPasswordCorrect) return next(createError(400,"Wrong passeword or username"))

        const {passeword,isAdmin,...otherDetails}=user._doc
        // we have import JWT to our project : npm i jsonwebtoken
        // we put our key in .env file we name it JWT and we call it here below
        const token =jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        // we import cookie-parser : npm i cookie-parser
        res.cookie("access_token",token,{httpOnly:true}).status(200).json({details:{...otherDetails},isAdmin});
    } catch (error) {
        next(error)
        
    }
}