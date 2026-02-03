import { prisma } from "../../config/prisma";
import { stripe } from "../../config/stripe"
import { AppError } from "../../error/coustom.error";
import { getOrCreateCustomer } from "../../utils/getOrCreateCustomer";
import httpStatusCode  from "http-status-codes";
const createPaymentInit=async(price:number)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:price*100,
        currency:"bdt",
       automatic_payment_methods:{enabled:true},
    })

    console.log("Payment Intent:",paymentIntent);

    return paymentIntent
}

const paymentSession=async(userId:string,priceId:string)=>{
    console.log("Creating payment session for User ID:", userId, "with Price ID:", priceId);
    const user=await prisma.user.findUnique({where:{id:userId}});
   if(!user){
    throw new AppError("User not found",httpStatusCode.NOT_FOUND);
   }
    const customerId=await getOrCreateCustomer(user);
    const session=await stripe.checkout.sessions.create({
      mode:'subscription'  ,
      customer: customerId,
      payment_method_types:['card'],
      line_items:[
            {
                price:priceId,
                quantity:1
            }
        ],
       success_url:'http://localhost:3000/success',
       cancel_url:'http://localhost:3000/cancel'
    })
    console.log("Payment Session:",session);
    return session;
}

export const paymentServices={
    createPaymentInit,
    paymentSession
}