
import { Router } from "express";
import { verifyUser } from "../middleware/protectRoute.js";
import { OnRampTransactionsUpdated,  checkout,webhook,  getBalance, getOnRampTransactions,get5Transactions} from "../controllers/walletController.js";
const router = Router();

router.route('/get-balance').get(verifyUser,getBalance)

router.route('/checkout').post(verifyUser,checkout)
router.route('/onramp').post(verifyUser,OnRampTransactionsUpdated)
router.route('/get-transactions').get(verifyUser,getOnRampTransactions)
router.route('/get-5-transactions').get(verifyUser,get5Transactions)

 router.route('/webhook').post(webhook)




export default router;