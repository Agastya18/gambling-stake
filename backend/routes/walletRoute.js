
import { Router } from "express";
import { verifyUser } from "../middleware/protectRoute.js";
import { OnRampTransactionsUpdated,  getBalance, getOnRampTransactions} from "../controllers/walletController.js";
const router = Router();

router.route('/get-balance').get(verifyUser,getBalance)
router.route('/').post(verifyUser,OnRampTransactionsUpdated)
router.route('/get-transactions').get(verifyUser,getOnRampTransactions)
// router.route('/webhook').post(bankWebhook)




export default router;