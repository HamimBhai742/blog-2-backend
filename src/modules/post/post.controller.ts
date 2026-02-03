import { NextFunction, Request, Response } from "express";
import { createAsyncFn } from "../../utils/create.asyncFn";
import { postServices } from "./post.services";
import { sendResponse } from "../../utils/send.response";
import httpStatuCode from "http-status-codes";


const createPost=createAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.user as IJwtPayload;
const post =await postServices.createPost({...req.body,authorId:userId});


sendResponse(res,{
    statusCode:httpStatuCode.CREATED,
    success:true,
    message:"Post created successfully",
    data:post
})
})


const getAllMyPosts=createAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.user as IJwtPayload;
    const posts=await postServices.getAllMyPosts(userId);

    sendResponse(res,{
        statusCode:httpStatuCode.OK,
        success:true,
        message:"All my posts retrieved successfully",
        data:posts
    })
})

const getPostById=createAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    // Implementation for getting a post by ID will go here
    const getPostById=await postServices.getPostById(req.params.postId as string);

    sendResponse(res,{
        statusCode:httpStatuCode.OK,
        success:true,
        message:"Post retrieved successfully",
        data:getPostById
    })

})

const likeById=createAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.user as IJwtPayload;
    const likePost=await postServices.likeById(req.params.postId as string,userId);
    sendResponse(res,{
        statusCode:httpStatuCode.OK,
        success:true,
        message:"Post liked successfully",
        data:likePost
    })      
})

export const postController={
    createPost,
    getAllMyPosts,
    getPostById,
    likeById
}