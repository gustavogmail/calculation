import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
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

// Servir a aplicação client buildada
app.use(express.static(path.join(__dirname, 'client', 'my-app', 'build')));

app.use('/tasks/', taskRouter);
 
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
});

async function startApp() {
    try {
        const num = await taskController.calculateTask();
    } catch (error) {
        console.error('Ocorreu um erro ao calcular a tarefa:', error);
    }
};

setInterval(startApp, 2000);
 
export default app;