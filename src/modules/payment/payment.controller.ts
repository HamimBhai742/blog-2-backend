import { createAsyncFn } from "../../utils/create.asyncFn";
import { sendResponse } from "../../utils/send.response";
import { paymentServices } from "./payment.services";
import httpStatusCode from "http-status-codes";

const createPaymentInit=createAsyncFn(async(req,res,next)=>{
    const paymentIntent=await paymentServices.createPaymentInit(req.body.amount)
   
    sendResponse(res,{
        statusCode:httpStatusCode.OK,
        success:true,
        message:"Payment Initiated Successfully",
        data:paymentIntent
    })
}
)

export const paymentController={
    createPaymentInit
}