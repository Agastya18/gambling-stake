import{ prisma} from "../db/prisma.js";
import bcrypt   from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const Signup = async (req, res) => {

    const  {  password, username} = req.body

    if(  !password || !username ){
      return res.status(400).json({message: "All fields are required"})
  }
  
      try {
        
        const userExists = await prisma.user.findUnique({
          where: {
            username
          }
        })
          if(userExists){
              return res.status(400).json({message: "User already exists"})
          }
  
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
  
  
        const user = await prisma.user.create({
          data: {
            username,
            password: hashPassword,
            // Balance: {
            //   create: [
            //     {
            //       amount: 0,
            //       locked: 0
                  
            //     },
            //   ],
            // },
  
  
  
          },
          select:{
            id: true,
           
            username: true
          }
        });
  
        const authtoken = jwt.sign({id: user.id}, process.env.JWT_SECRET || '', {expiresIn: 3600})
  
        res.cookie('authToken', authtoken, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          maxAge: 3600000 ,// 1 hour
          
        });
       
  
  
        res.status(200).json({message: "User signed up successfully", authtoken, user: {
          id: user.id,
         
          username: user.username,
          
        }});
        
      } catch (error) {
  
        console.log(error)
        
      }
}

export const Login = async (req, res) => {
    const { username, password } = req.body;
  
    if(  !password || !username ){
      return res.status(400).json({message: "All fields are required"})
  }
  
    try {
      const user = await prisma.user.findUnique({
        where: {
            username
        }
      })
  
      if(!user){
        return res.status(400).json({message: "Invalid credentials"})
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if(!isMatch){
        return res.status(400).json({message: "Invalid credentials"})
      }
  
      const authtoken = jwt.sign({id: user.id}, process.env.JWT_SECRET || '', {expiresIn: 3600})
  
      res.cookie('authToken', authtoken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 3600000 ,// 1 hour
        
      });
  
      res.status(200).json({message: "User logged in successfully", authtoken, user: {
        id: user.id,
       
        username: user.username,
        
      }});
  
    } catch (error) {
      console.log(error)
    }
  }


  export const getUser = async(req, res) =>{
    const users = await prisma.user.findMany();
    res.json(users);
  }
