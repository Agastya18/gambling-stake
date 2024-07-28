import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';


export const verifyUser = async(req, res, next) => {
    try {
    const token = req.cookies.authToken 
        //console.log(token)
         if (!token) {
             return res.status(401).json({ message: "No token, authorization denied" });
         }
         const decoded = jwt.verify(token, jwtSecret);

            const user = await prisma.user.findUnique({
                where: {
                    id: decoded.id
                },
                select: {
                    id: true,
                    username: true,
                   
                }
            });

            if (!user) {
                return res.status(401).json({ message: "Token is not valid" });
            }

            req.user = user;
            next();
           
            

        
        
        
    } catch (error) {
        console.log(error);
    }
}