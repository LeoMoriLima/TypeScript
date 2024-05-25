"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config_1 = __importDefault(require("../config/config"));
const authUser = (req, res, next) => {
    try {
        const sessionToken = req.cookies.session_id;
        if (!sessionToken) {
            return res.status(401).json({ error: "Token JWT Ausente!" });
        }
        jwt.verify(sessionToken, config_1.default.SECRET_KEY, (error) => {
            if (error) {
                return res.status(403).json({ error: "Token JWT inválido!" });
            }
            else {
                next();
            }
        });
    }
    catch (error) {
        return res.status(403).json({ error: "Token JWT inválido!" });
    }
};
exports.default = authUser;
