import { Router } from "express";

const router : Router = Router();
const userController = require('../controllers/userController');
import authUser from "../middleware/authMiddleware";

router.post("/" , userController.register);
router.post("/login", userController.login);
router.delete("/logout", userController.logout);
router.delete("/:id", authUser, userController.deleteUser);
router.patch("/:id",authUser, userController.updateUser);
router.get("/", userController.getAllUsers);


export default router;