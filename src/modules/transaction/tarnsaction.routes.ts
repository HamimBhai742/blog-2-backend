import { Router } from "express";
import { transactionController } from "./transaction.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

const router=Router();

router.post('/create',checkAuth(Role.USER),transactionController.createTransaction);
router.get('/all',checkAuth(Role.USER),transactionController.getAllTransactions);

export const transactionRoutes=router;