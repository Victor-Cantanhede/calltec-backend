import { Request, Response, NextFunction } from 'express';

// Middleware para ferificar se o usuário possui acesso de técnico ou admin
export const onlyTechnical = (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (user && user.accesslevel >= 2) {
        next();

    } else {
        res.status(403).json({ message: 'Acesso negado: Seu nível de acesso não é autorizado para realizar esta operação!' });
    }
};