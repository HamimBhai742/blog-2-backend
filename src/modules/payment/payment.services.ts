import { stripe } from "../../config/stripe"

const createPaymentInit=async(price:number)=>{
    const paymentIntent=await stripe.paymentIntents.create({
        amount:price*100,
        currency:"bdt",
       automatic_payment_methods:{enabled:true},
    })

    console.log("Payment Intent:",paymentIntent);

    return paymentIntent
}

export const paymentServices={
    createPaymentInit
}