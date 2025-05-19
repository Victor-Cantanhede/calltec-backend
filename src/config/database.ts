import mongoose from 'mongoose';

const connectDatabase = async () => {
    try {
        console.log('Contectando ao banco de dados...');
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Banco de dados contectado!');

    } catch (error) {
        console.error('Erro ao conectar com o banco de dados', (error as Error).message);
        process.exit(1); // Encerra caso erro
    }
};

export default connectDatabase;