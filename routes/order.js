import express from "express"
import { getAdminOrders, getMyOrders, getOrderDetails, placeOrder, placeOrderOnline, processOrder } from "../controllers/order.js";
import { authorizeAdmin, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();


router.post("/createorder",placeOrder)

router.post("/createoreronline",placeOrderOnline)

router.get("/myorders",isAuthenticated ,getMyOrders)

router.get("/order/:id",isAuthenticated,getOrderDetails)

//Add Admin middleware
router.get("/admin/orders",isAuthenticated,authorizeAdmin,getAdminOrders)

router.get("/admin/order/:id",isAuthenticated,authorizeAdmin,processOrder)
export default router