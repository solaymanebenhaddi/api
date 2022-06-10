import express from "express"
import { countByCity, countByType,createProperty, deletProperty, getAllProperty, getProperty, UpdateProperty,getPropertyRooms } from "../controllers/property.js";
import Property from "../models/Property.js";
import { createError } from "../utils/error.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router= express.Router();

// CREATE
router.post("/",verifyAdmin,createProperty)
// UPDATE
router.put("/:id",verifyAdmin,UpdateProperty)
// DELETE
router.delete("/:id",verifyAdmin,deletProperty)

// GET
/* This is a get request that is looking for a specific hotel by its id. */
router.get("/find/:id",getProperty)

// GET ALL
router.get("/",getAllProperty)

router.get("/countByCity",countByCity);
router.get("/countByType",countByType)
//the id below is for hotel selected
router.get("/room/:id",getPropertyRooms)
export default router;