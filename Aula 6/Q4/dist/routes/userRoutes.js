"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const userController = require('../controllers/userController');
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
router.post("/", userController.register);
router.post("/login", userController.login);
router.delete("/logout", userController.logout);
router.delete("/:id", authMiddleware_1.default, userController.deleteUser);
router.patch("/:id", authMiddleware_1.default, userController.updateUser);
router.get("/", userController.getAllUsers);
exports.default = router;
