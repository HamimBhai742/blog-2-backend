import { User } from "../../generated/prisma/browser";
import { prisma } from "../config/prisma";
import { stripe } from "../config/stripe";

export async function getOrCreateCustomer(user: User) {
  if (user.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email: user.email,
    metadata: {
      userId: user.id,
    },
  });

  // save customer.id in DB
  await prisma.user.update({
    where: { id: user.id },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}
