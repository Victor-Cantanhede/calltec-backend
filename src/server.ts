import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './config/database';

import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import subCategoryRoutes from './routes/subCategoryRoutes';
import departmentRoutes from './routes/departmentRoutes';
import ticketRoutes from './routes/ticketRoutes';


dotenv.config();
connectDatabase();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.FRONT_URI as string,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subCategoryRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/ticket', ticketRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});