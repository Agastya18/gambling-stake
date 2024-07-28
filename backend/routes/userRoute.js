import { Router } from "express";
import { Signup,Login,getUser,Logout } from "../controllers/userController.js";
//import { verifyUser } from "../middleware/protectRoute";

 const router = Router();

     router.route('/get-user').get(getUser)
    router.route('/signup').post(Signup)
    router.route('/login').post(Login);
    router.route('/logout').get(Logout);
//  router.route('/create').post(createUser)
 

export default router;