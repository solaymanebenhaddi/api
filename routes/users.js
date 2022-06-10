import express from "express"
import { UpdateUser,deletUser,getUser,getAllUser } from "../controllers/user.js";
import { verifyToken, verifyUser,verifyAdmin } from "../utils/verifyToken.js";

const router= express.Router();

// router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//   res.send("hello you are logged in ")  

// })

// router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("hello you are logged in and u ca delet your account ")  
  
//   })
// router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
//     res.send("hello ADmin you are logged in and u ca delet your account ")  
  
//   })

// UPDATE
router.put("/:id",verifyUser,UpdateUser)
// DELETE
router.delete("/:id",verifyUser,deletUser)

// GET
/* This is a get request that is looking for a specific User by its id. */
router.get("/:id",verifyUser,getUser)

// GET ALL
router.get("/",verifyAdmin,getAllUser)



export default router;