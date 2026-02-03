import { prisma } from "../../config/prisma";
import { stripe } from "../../config/stripe"
import { AppError } from "../../error/coustom.error";
import { getOrCreateCustomer } from "../../utils/getOrCreateCustomer";
import httpStatusCode  from "http-status-codes";


const createPaymentInit=async(price:number)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        amount: price * 100,
        currency:"usd",
       automatic_payment_methods:{enabled:true},
       
    })

    console.log("Payment Intent:",paymentIntent);

    return paymentIntent
}

const paymentSession=async(userId:string,priceId:string)=>{
    const transactionId="txn_"+Math.random().toString(36).substring(2,12);
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
       success_url:`http://localhost:5000/api/v1/payments/success?userId=${userId}&transactionId=${transactionId}`,
       cancel_url:'http://localhost:3000/cancel'
    })

    // const session=await stripe.checkout.sessions.create({
    //     mode:'payment'  ,
    //     line_items:[
    //         {
    //             price_data:{
    //                 currency:'usd',
    //                 product_data:{  
    //                     name:'Sample Product'
    //                 },
    //                 unit_amount:5000
    //             },
    //             quantity:3
    //         }
    //     ]
    //     ,
    //      success_url:'http://localhost:3000/success',
    //         cancel_url:'http://localhost:3000/cancel',
    //         customer:customerId
    // })
    console.log("Payment Session:",session);
    return session;
}

const paymentSuccess=async(userId:string,transactionId:string)=>{
     return await prisma.$transaction(async(tx)=>{

        const updatedPayments= await tx.payment.upsert({
            where:{userId:userId,transactionId:transactionId},
            create:{status:'completed',transactionId:transactionId,amount:0,userId},
            update:{status:'completed',transactionId:transactionId},
        })
        return updatedPayments;
     })
}

export const paymentServices={
    createPaymentInit,
    paymentSession,
    paymentSuccess
}