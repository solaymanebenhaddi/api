import User from "../models/User.js"


export const UpdateUser = async(req,res,next)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set : req.body},{new:true})
        res.status(200).json(updatedUser)
        
    } catch (error) { 
        next(error)
    }
 
}
export const deletUser = async(req,res,next)=>{
    const newUser= new User(req.body) 
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
        
    } catch (error) {
        next(error)
    }
}
export const getUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
        
    } catch (error) {
        next(error)
    }
}
export const getAllUser = async(req,res,next)=>{
    try {
        const user = await User.find()
        res.status(200).json(user)
        
    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}