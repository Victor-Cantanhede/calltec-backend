import { Request, Response, NextFunction } from 'express';

export const onlyAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (user && user.accesslevel === 3) {
        next();

    } else {
        res.status(403).json({ message: 'Acesso negado: Seu nível de acesso não é autorizado para realizar esta operação!' });
    }
};