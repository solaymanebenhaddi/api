import Property from "../models/Property.js"
import Room from "../models/Room.js"

export const createProperty = async(req,res,next)=>{
    const newProperty= new Property(req.body) 
    try {
        const savedProperty = await newProperty.save()
        res.status(200).json(savedProperty)
        
    } catch (error) {
        next(error)
    }
}
export const UpdateProperty = async(req,res,next)=>{
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, {$set : req.body},{new:true})
        res.status(200).json(updatedProperty)
        
    } catch (error) {
        next(error)
    }

}
export const deletProperty = async(req,res,next)=>{
    const newProperty= new Property(req.body) 
    try {
        await Property.findByIdAndDelete(req.params.id)
        res.status(200).json("Property has been deleted")
        
    } catch (error) {
        next(error)
    }
}
export const getProperty = async(req,res,next)=>{
    try {
        const Property = await Property.findById(req.params.id)
        res.status(200).json(Property)
        
    } catch (error) {
        next(error)
    }
}
export const getAllProperty = async(req,res,next)=>{
    const{min,max,...others}=req.params
    try {
        console.log(req.query.min)
        const Propertys = await Property.find({...others, cheapestPrice: { $gte:req.query.min || 1, $lte: req.query.max || 999 } }).limit(req.query.limit)
        res.status(200).json(Propertys)
        
    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Property.countDocuments({city:city})
        }))
        res.status(200).json(list)
        
    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
export const countByType = async(req,res,next)=>{
     try {
    const PropertyCount= await Property.countDocuments({type:"Property"})
    const apartmntCount= await Property.countDocuments({type:"apartmnt"})
    const resrtCount= await Property.countDocuments({type:"resort"})
    const villaCount= await Property.countDocuments({type:"villa"})
    const cabinCount= await Property.countDocuments({type:"cabin"})
    res.status(200).json([
        {type:"Property",count:PropertyCount},
        {type:"apartmnt",count:apartmntCount},
        {type:"resort",count:resrtCount},
        {type:"villa",count:villaCount},
        {type:"cabin",count:cabinCount},
    ])

        
    } catch (error) {
        // res.status(500).json(error)
        next(error)
    }
}
export const getPropertyRooms = async (req,res,next)=>{
    try {
        const Property = await Property.findById(req.params.id)
        const list = await Promise.all(
            //Property.rooms it return id room 
            Property.rooms.map((room)=>{
                return Room.findById(room);
            }))
        res.status(200).json(list);
    } catch (error) {
        next(error)
    }
}

