import 'express-async-errors';
import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import taskRouter from './routers/taskRouter';
import taskController from './controllers/taskController';

const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Serve the built client application
app.use(express.static(path.join(__dirname, 'client', 'my-app', 'build')));

// Server router
app.use('/tasks/', taskRouter);
 
app.use((error: Error, req: Request, res: Response) => {
    res.status(500).send(error.message);
});

// Main function
async function startApp() {
    try {
        await taskController.calculateTask();
    } catch (error) {
        console.error('Ocorreu um erro ao calcular a tarefa:', error);
    }
};

// While application is running, it gets and submits tasks continuously
setInterval(startApp, 2000);
 
export default app;