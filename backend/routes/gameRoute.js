import { Router } from "express";
import { verifyUser } from "../middleware/protectRoute.js";
import { diceLogic } from "../controllers/gameController.js";

const router = Router();

router.route('/dice').post(verifyUser, diceLogic);



export default router;