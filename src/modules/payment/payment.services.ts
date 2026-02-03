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

const paymentSession=async(userId:string)=>{
    const user=await prisma.user.findUnique({where:{id:userId}});
   if(!user){
    throw new AppError("User not found",httpStatusCode.NOT_FOUND);
   }
    const customerId=await getOrCreateCustomer(user);
    // const session=await stripe.checkout.sessions.create({
    //   mode:'subscription'  ,
    //   customer: customerId,
    //   payment_method_types:['card'],
    //   line_items:[
    //         {
    //             price:'price_1SwfHcAjWpOP8HLu3fgQQfjH',
    //             quantity:1
    //         }
    //     ],
    //    success_url:'http://localhost:3000/success',
    //    cancel_url:'http://localhost:3000/cancel'
    // })

    const session=await stripe.checkout.sessions.create({
        mode:'payment'  ,
        line_items:[
            {
                price_data:{
                    currency:'usd',
                    product_data:{  
                        name:'Sample Product'
                    },
                    unit_amount:5000
                },
                quantity:3
            }
        ]
        ,
         success_url:'http://localhost:3000/success',
            cancel_url:'http://localhost:3000/cancel',
            customer:customerId
    })
    console.log("Payment Session:",session);
    return session;
}

export const paymentServices={
    createPaymentInit,
    paymentSession
}