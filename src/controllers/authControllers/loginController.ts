import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../../models/User';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: 'Usuário não encontrado!' });
            return;
        }

        const passwordMatch: boolean = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Senha inválida!' });
            return;
        }

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            accesslevel: user.accesslevel
        }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login realizado com sucesso!', token });

    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar login!', error: (error as Error).message });
    }
};