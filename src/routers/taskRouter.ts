import express from 'express';
import taskController from '../controllers/taskController';

const router = express.Router();

router.get('/', taskController.getTasks);
router.get('/submitted', taskController.getSubmittedTasks);

export default router;