import jwt from "jsonwebtoken"
import {createError}from"../utils/error.js"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"you are  not authenticated"))

    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Token are not valid"));
        req.userinfo = user
    next()
    })
}

export const verifyUser =(req,res,next)=>{
        verifyToken(req,res,next, ()=>{
            if(req.userinfo.id === req.params.id || req.userinfo.isAdmin){
                next()
            }else{
                if(err) return next(createError(407,"you are not authorized"))
            }
        })
}

export const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,next, ()=>{
        if(req.userinfo.isAdmin){
            next()
        }else{
            if(err) return next(createError(407,"you are not authorized"))
        }
    })
}