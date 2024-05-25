import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import config from '../config/config';

const authUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies.session_id;

        if (!sessionToken) {
            return res.status(401).json({ error: "Token JWT Ausente!" });
        }

        jwt.verify(sessionToken, config.SECRET_KEY, (error:any) => {
            if (error) {
                return res.status(403).json({ error: "Token JWT inválido!" });
            } else {
                next();
            }})
            
    } catch (error) {

        return res.status(403).json({ error: "Token JWT inválido!" });
    }
};

export default authUser;
