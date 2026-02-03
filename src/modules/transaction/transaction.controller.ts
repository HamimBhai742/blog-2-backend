import { Request, Response } from "express";
import { createAsyncFn } from "../../utils/create.asyncFn";
import { sendResponse } from "../../utils/send.response";
import { transactionServices } from "./transaction.services";
import httpStatusCode from "http-status-codes";
const createTransaction=createAsyncFn(async(req:Request,res:Response)=>{
    const {type,amount}=req.body;
    const {userId}=req.user as IJwtPayload; 
    const transaction=await transactionServices.createTransaction(type,amount,userId);
    
    sendResponse(res,{
        statusCode:httpStatusCode.CREATED,
        success:true,
        message:"Transaction created successfully",
        data:transaction
    })
   
})

const getAllTransactions=createAsyncFn(async(req:Request,res:Response)=>{
    const transactions=await transactionServices.getAllTransactions();
    
    sendResponse(res,{
        statusCode:httpStatusCode.OK,
        success:true,
        message:"Transactions retrieved successfully",
        data:transactions
    })
})

export const transactionController={
    createTransaction,
    getAllTransactions
}