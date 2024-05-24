import express from "express";
import { UnfollowUser, deleteUser, followUser, getUser, updateUser } from "../Controllers/UserController.js"; // Fix the file extension here
const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);

router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser)
router.put("/:id/Unfollow", UnfollowUser)

export default router;
