import express from "express";
import { 
    authUser, registerUser, getAllUsers, getUserById, getUserProfile, updateUser, updateUserProfile, deleteUser, logoutUser
} from "../controllers/userControllers.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getAllUsers);
router.post('/auth', authUser);
router.post("/logout", logoutUser);

router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router
    .route("/:id")
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);

export default router;