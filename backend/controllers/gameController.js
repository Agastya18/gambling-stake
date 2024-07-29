import { prisma } from "../db/prisma.js";

export const diceLogic = async (req, res) => {
    const { betAmount, multiplier, rollOver, } = req.body;
    
    const winChance = Math.floor(100 / multiplier);
    const rollUnder = 100 - rollOver;
    const winAmount = betAmount * multiplier;
    const roll = Math.floor(Math.random() * 100) + 1;
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
    const updatedUser = await prisma.user.update({
        where: {
            id:  req.user.id,
        },
        data: {
            balance: {
                increment: newBalance,
            },
        },
    });
    res.json({
        isWin,
        roll,
        winAmount,
        newBalance: updatedUser.balance,
    })

;
}