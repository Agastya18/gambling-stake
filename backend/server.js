import express from "express";
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT= process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send('Server is ready');
// });
app.use('/api', userRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})







