import Room from "../models/Room.js";
import Property from "../models/Property.js";
import { createError } from "../utils/error.js";

export const creatRoom = async (req,res,next)=>{
    const PropertyId=req.params.propertyid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            // we used updateOne instead of findbyID because its doesnt accpet $push so updateOne resolve this Issue 
            await Property.updateOne({PropertyId},{$push : {rooms:savedRoom._id }})
        } catch (error) {
            next(error)
        }
      res.status(200).json(savedRoom);  
    } catch (error) {
        next(error)
    }

}

export const UpdateRoom = async(req,res,next)=>{
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
             {$set : req.body},
             {new:true})
        res.status(200).json(updatedRoom)
        
    } catch (error) {
        next(error)
    }

}

export const UpdateRoomAvailability = async(req,res,next)=>{
    console.log("hello world")
    try {

        
         await Room.updateOne({"roomNumbers._id":req.params.id},{
             $push:{
                 "roomNumbers.$.unavailableDates": req.body.date
             }
         })   
         

        res.status(200).json("Room status has been updated")
        
    } catch (error) {
        next(error)
    }

}
export const deletRoom = async(req,res,next)=>{
    const hotelId=req.params.hotelid;  
    const newRoom= new Room(req.body) 
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            // we used updateOne instead of findbyID because its doesnt accpet $push so updateOne resolve this Issue 
            await Hotel.deleteOne({hotelId},{$pull : {rooms:req.params.id }})
        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been deleted")
        
    } catch (error) {
        next(error)
    }
}
export const getRoom = async(req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
        
    } catch (error) {
        next(error)
    }
}
export const getAllRoom = async(req,res,next)=>{
    try {
        const rooms = await Room.find()
        res.status(200).json(rooms)
        
    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
