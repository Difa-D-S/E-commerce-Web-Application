import express from 'express';
const router = express.Router();
import { addOrderitems, getOrderByID, getMyOrder, updateOrdertoDelivered, updateOrdertoPaid, getOrders } from '../controllers/OrderControllers.js';

import {protect, admin} from '../middleware/authMiddleware.js';

router.route("/").post(protect, addOrderitems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrder);
router.route("/:id").get(protect, getOrderByID);
router.route("/:id/pay").put(protect, updateOrdertoPaid);
router.route("/:id/deliver").put(protect, admin, updateOrdertoDelivered);

export default router;