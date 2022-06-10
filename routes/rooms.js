import express from "express"
import { creatRoom, deletRoom, getAllRoom, getRoom, UpdateRoom, UpdateRoomAvailability } from "../controllers/room.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import {verifyAdmin} from "../utils/verifyToken.js"

const router= express.Router();

// CREATE
router.post("/:hotelid",verifyAdmin,creatRoom)
// UPDATE 
router.put("/:id",verifyAdmin,UpdateRoom)
router.put("/availability/:id",UpdateRoomAvailability)
// DELETE
router.delete("/:id/:hotelid",verifyAdmin,deletRoom)

// GET
/* This is a get request that is looking for a specific Room by its id. */
router.get("/:id",getRoom)

// GET ALL
router.get("/",getAllRoom)
export default router;