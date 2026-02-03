import { prisma } from "../../config/prisma";
import uuid from 'uuid';
const createTransaction = async (type:'cash_in' | 'cash_out', amount: number, userId: string) =>{
    const transactionId = "txn_" + uuid.v4().split('-').join('').slice(0,10);
    const transaction = await prisma.transaction.create({
    data: {
    type,
    amount,
    userId,
    transactionId
  }
  });
return transaction;
}

const getAllTransactions = async () => {
    const transactions = await prisma.transaction.findMany();
    return transactions;
}

export const transactionServices = {
    createTransaction,
    getAllTransactions
};