import { prisma } from "../db/prisma.js";

export const diceLogic = async (req, res) => {
    const { betAmount, multiplier, rollOver, } = req.body;
    
    const rollUnder = 100 - rollOver;
    const winAmount = betAmount * multiplier;
    const roll = Math.floor(Math.random() * 100) ;
    const isWin = roll <= rollUnder;
    const newBalance = isWin ? winAmount : -betAmount;
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id,

        },
    });
    if (user.balance < betAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
    }
    const updatedUser = await prisma.balance.update({
        where: {
            userId:  req.user.id,
        },
        data: {
            amount: {
                increment: parseInt(newBalance),
            },
        },
    });
    // console.log(`Roll: ${roll}, Roll under: ${rollUnder}, Win: ${isWin}, Win amount: ${winAmount}, New balance: ${updatedUser.balance}`);
    res.json({
        isWin,
        roll,
        winAmount,
        newBalance: updatedUser.amount,
    })

;
}