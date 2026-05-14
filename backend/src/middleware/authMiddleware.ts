import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: number;
    user?: any;
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = typeof authHeader === 'string' && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : undefined;

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const secret = process.env.JWT_SECRET || 'secretkey';
    try {
        const payload = jwt.verify(token, secret) as any;
        req.userId = Number(payload.userId);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
};
