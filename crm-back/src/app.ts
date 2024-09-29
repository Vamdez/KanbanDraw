import express, { Application } from 'express';
import cardRoutes from './routes/cardRoutes';
import dropperRoutes from './routes/dropperRoutes';
import projectRoutes from './routes/projectRoutes';

const app: Application = express();

// Middleware para processar JSON
app.use(express.json());

// Define a rota principal /api/cards para operações com cards
app.use('/cards', cardRoutes);
app.use('/droppers', dropperRoutes);
app.use('/projects', projectRoutes);

export default app;
