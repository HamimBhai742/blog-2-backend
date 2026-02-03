import { Router } from "express";
import { paymentController } from "./payment.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { paymentValidation } from "./payment.zod.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router =Router()


router.post('/create-payment-intent',validateRequest(paymentValidation),checkAuth(Role.USER),paymentController.createPaymentInit)

export const paymentRoutes=router;