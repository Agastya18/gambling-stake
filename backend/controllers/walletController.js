import { prisma } from "../db/prisma.js";

import { instance } from "../server.js";
import crypto from 'crypto';
export const OnRampTransactionsUpdated = async (req, res) => {

    const { amount, provider } = req.body;
    if(amount<100 ){
        return res.status(400).json({
            message: "Minimum amount is 100"
        });
    }
    const token =  crypto.randomBytes(5).toString('hex');
   
    const transaction = await prisma.onRampTransaction.create({
        data: {
            amount: amount ,
            status: "Processing",
            provider: provider,
            token: token,
            userId: req.user.id,
            // Add the startTime property with the current date/time
        },
    });

    res.status(200).json({
        message: "Transaction created successfully",
        transaction: transaction,
        "token": token

    });
    

}
export const checkout = async (req, res) => {
    
try {
    const {amount}= req.body
     // console.log("amount",amount)
    if(amount<100 ){
        return res.status(400).json({
            message: "Minimum amount is 100"
        });
    }

   // console.log(amount)
    const options = {
        amount:amount , // amount in the smallest currency unit
        currency: "INR",
        receipt:crypto.randomBytes(4).toString('hex'),
          notes: {
              userId: req.user.id,
            }
      
      };
  
      const order = await instance.orders.create(options);
     // console.log(order);
    
      res.status(200).json({
        success: true,
        order,
      });
    
} catch (error) {
    console.log(error);
    
}

}

export const getOnRampTransactions = async (req, res) => {
    
    const txns = await prisma.onRampTransaction.findMany({

        where: {
            userId:req.user.id
        }
        
    
    });
    res.status(200).json(txns);


}

export const get5Transactions = async (req, res) => {
    
    const txns = await prisma.onRampTransaction.findMany({

        where: {
            userId:req.user.id
        },
        orderBy: {
            createdAt: "desc",
        },
        take:5,
        
    
    });
    res.status(200).json(txns);


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




export const webhook = async (req, res) => {
    const secret = process.env.WEBHOOK_SECRET || '';

    try {
    // Calculate the signature
    const shasum = crypto.createHmac('sha256', secret);
    
    shasum.update(JSON.stringify(req.body));

    const digest = shasum.digest('hex');


    // console.log(req.headers)
   //console.log('Received webhook signature:', req.headers['x-razorpay-signature']);
   // console.log('Received webhook signature:', req.headers['x-razorpay-signature']);
    //console.log('digest signature:', digest);

    // Verify the signature
    if (digest === req.headers['x-razorpay-signature'] ) {
      //  console.log('Webhook signature verified');

        // Process the webhook payload
        const event = req.body;
       // console.log('Received event:', event);

        // Perform necessary actions based on the event type
        switch (event.event) {
            case 'payment.captured':
                // Handle payment captured
               // console.log('Payment captured:', event.payload.payment.entity);

                const paymentInformation = {
                    token: event.payload.payment.entity.notes.token,
                    userId: event.payload.payment.entity.notes.userId,
                    amount: event.payload.payment.entity.amount
                };
            //  const finalPaymentInformation = (event.payload.payment.entity.amount)/100;
            //   console.log(finalPaymentInformation);
                try {
                    
                    await prisma.$transaction([
                        prisma.balance.update({
                            where: {
                                userId:paymentInformation.userId
                            },
                            data: {
                               amount:{
                                      increment: parseInt(paymentInformation.amount)/100
                                 
                               }
                            }
                        }),
                        prisma.onRampTransaction.updateMany({
                            where: {
                               token: paymentInformation.token
                            },
                            data: {
                                status: "Success"
                            }
                        })
                    ]);
                    
        
                   return  res.status(200).json({
                        message: "Webhook processed successfully-captured"
                    });
                } catch(e) {
                    console.error(e);
                   return res.status(411).json({
                        message: "Error while processing webhook"
                    })
                }
                break;
           
            default:
                console.warn(`Unhandled event type: ${event.event}`);
        }

        // Respond to Razorpay with a success message
       return res.status(200).send(
            {status:"ok", message: "Webhook received successfully"}
        );
    } else {
        console.error('Webhook signature verification failed');
       return res.status(403).send('Invalid signature');
    }
    } catch (error) {
        console.log(error);
    }


}

