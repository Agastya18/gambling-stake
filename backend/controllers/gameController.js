import { prisma } from "../db/prisma.js";

function getRandomNumber() {
    const loseProbability = 0.6; // 60% chance of losing
    const winProbability = 0.4;  // 40% chance of winning
    const winNumbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; // Possible numbers (multiples of 10 up to 100)
    const winningNumber = winNumbers[winNumbers.length - 1]; // Define the winning number as the highest number (100)
  
    if (Math.random() < loseProbability) {
      // Select a losing number
      let randomNumber;
      do {
        randomNumber = winNumbers[Math.floor(Math.random() * (winNumbers.length - 1))];
      } while (randomNumber === winningNumber); // Ensure the number is not the winning number
      return randomNumber;
    } else {
      // Select a winning number
      return winningNumber;
    }
  }
  

//   console.log(getRandomNumber());
export const diceLogic = async (req, res) => {
    const { betAmount, multiplier, rollOver, } = req.body;
    
    const rollUnder = 100 - rollOver;
    let winAmount = betAmount * multiplier;
    const roll = getRandomNumber();
    const isWin = roll <= rollUnder;

    //   const getBalance = await prisma.balance.findUnique({
    //     where: {
    //         userId: req.user.id,
    //     },
    //   })

   

    const user = await prisma.balance.findUnique({
        where: {
            userId: req.user.id,

        },
    });
   // console.log(user);
   let payout;

   let newBalance = user.amount;
   if (isWin) {
       newBalance += winAmount;
       payout=winAmount;
   }else{
       newBalance -= betAmount;
         payout=-betAmount;
   }
    
    if (user.amount < betAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
    }

   
    if(newBalance <=0) {
        newBalance = 0;
        winAmount=0;
    }
  
    
    const updatedUser = await prisma.balance.update({
        where: {
            userId:  req.user.id,
        },
        data: {
            amount:  parseInt(newBalance),
        },
    });
    const game = await prisma.gameTransaction.create({
        data: {
            userId: req.user.id,
            betAmount: betAmount,
            multiplier: multiplier,
            status: isWin,
            payout: payout,
        },
    });


    res.status(200).json({
        isWin,
        roll,
        // winAmount,
        payout,
        newBalance: updatedUser.amount,

    });


}

export const getGamesTxn=async(req,res)=>{
    try {
      const games = await prisma.gameTransaction.findMany({
        where: {
            userId:req.user.id
        },
        orderBy: {
            createdAt: "desc",
        },
        take:5,
    });
    res.status(200).json(games);
      
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      
    }

}