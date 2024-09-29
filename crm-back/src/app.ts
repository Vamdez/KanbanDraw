import express, { Application } from 'express';
import cardRoutes from './routes/cardRoutes';

const app: Application = express();

// Middleware para processar JSON
app.use(express.json());

// Define a rota principal /api/cards para operações com cards
app.use('/cards', cardRoutes);

export default app;
