import { NextFunction, Request, Response } from "express";
import { createAsyncFn } from "../../utils/create.asyncFn";
import { sendResponse } from "../../utils/send.response";
import { paymentServices } from "./payment.services";
import httpStatusCode from "http-status-codes";

const createPaymentInit=createAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const paymentIntent=await paymentServices.createPaymentInit(req.body.amount)
   
    sendResponse(res,{
        statusCode:httpStatusCode.OK,
        success:true,
        message:"Payment Initiated Successfully",
        data:paymentIntent
    })
}
)

const paymentSession=createAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.user as IJwtPayload;
    const {priceId}=req.body;
    const session=await paymentServices.paymentSession(userId,priceId);
    
    sendResponse(res,{
        statusCode:httpStatusCode.OK,
        success:true,
        message:"Payment Session Created Successfully",
        data:session
    })
})


const paymentSuccess=createAsyncFn(async(req:Request,res:Response,next:NextFunction)=>{
    const params=req.params;
    console.log("Payment Success Params:",params);
    // const payment=await paymentServices.paymentSuccess(userId,transactionId);

    // Handle post-payment success actions here
    sendResponse(res,{  
        statusCode:httpStatusCode.OK,
        success:true,
        message:"Payment Success",
        data:null
    })
})

export const paymentController={
    createPaymentInit,
    paymentSession,
    paymentSuccess
}