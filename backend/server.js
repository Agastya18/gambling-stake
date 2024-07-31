import express from "express";
import dotenv from 'dotenv';
// import cors from 'cors';
import path from "path"
import Razorpay from 'razorpay';
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser';
import walletRoute from './routes/walletRoute.js'
import gameRoute from './routes/gameRoute.js'
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const __dirname = path.resolve()
const PORT= process.env.PORT || 8000;
// app.use(cors(

//     {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials:true
//     }
// ));



export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY || "",
    key_secret: process.env.RAZORPAY_APT_SECRET || "",
  });

  
app.use('/api', userRoute);
app.use('/api/wallet', walletRoute);
app.use('/api/game', gameRoute);

if (process.env.NODE_ENV !== "development") {

  // Serve static assets from the frontend build directory
   app.use(express.static(path.join(__dirname, "/frontend/dist")));
  
  // Handle all other requests to serve the React app
   app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
   });
  }

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})







