//Router Configuration
import { Router } from "express";
const router = Router();
//importing the middlewares and controllers -> To route the request to the correct controller function with middleware as configured.
import authenticationCheck from "../Middleware/middleware.js";
import { signup, login, getUserInfo } from "../Controller/userController.js";
import { getBalance } from "../Controller/capitalController.js";
import { addTransaction, editTransaction, deleteTransaction, getTransactionDetails } from "../Controller/transactionController.js";

//auth router
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:userId", getUserInfo);

//capital router
router.get("/balance", authenticationCheck, getBalance);

//Transaction router
router.post("/transaction/new", authenticationCheck, addTransaction);
router.get("/transaction/:transactionId", authenticationCheck, getTransactionDetails);
router.put("/transaction/edit/:transactionId", authenticationCheck, editTransaction);
router.delete("/transaction/delete/:transactionId", authenticationCheck, deleteTransaction)

export default router;
