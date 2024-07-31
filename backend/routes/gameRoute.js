import { Router } from "express";
import { verifyUser } from "../middleware/protectRoute.js";
import { diceLogic,getGamesTxn } from "../controllers/gameController.js";

const router = Router();

router.route('/dice').post(verifyUser, diceLogic);
router.route('/get-games').get(verifyUser, getGamesTxn);



export default router;