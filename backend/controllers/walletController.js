import { prisma } from "../db/prisma.js";

export const OnRampTransactionsUpdated = async (req, res) => {

    const { amount, provider } = req.body;
   // const token = crypto.randomBytes(10).toString('hex');
   
    const transaction = await prisma.onRampTransaction.create({
        data: {
            amount: amount ,
            status: "Processing",
            provider: provider,
           // token: token,
            userId: req.user.id,
            startTime: new Date() // Add the startTime property with the current date/time
        },
    });

  

    res.status(200).json({
        message: "Transaction created successfully",
        transaction: transaction,
        "token": token

    });
    
    
    
        


}

export const getOnRampTransactions = async (req, res) => {
    
    const txns = await prisma.onRampTransaction.findMany({

        where: {
            userId:req.user.id
        }
        
    
    });
    res.json(txns);


}

export const getBalance = async (req, res) => {
   
    const balance = await prisma.balance.findFirst({
        where: {
            userId: req.user.id
        }
    });
   return res.status(200).json({
    balance
   })
}
