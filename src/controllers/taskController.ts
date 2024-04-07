import { Request, Response } from 'express';
import Task from '../models/task';
import SubmittedTask from "../models/submittedTask";
import taskService from '../services/taskService';
import taskRepository from '../repositories/taskRepository';

async function getTasks(req: Request, res: Response) {
    const tasks = await taskRepository.getTasks();
    res.json(tasks);
}

async function getSubmittedTasks(req: Request, res: Response) {
    const tasks = await taskRepository.getSubmittedTasks();
    res.json(tasks);
}

async function getTask(): Promise<Task> {
    const task = taskService.getTask();
    const newTask = new Task((await task).id, (await task).operation, (await task).left, (await task).right)
    await taskRepository.addTask(newTask);
    return task;
}

async function calculateTask(): Promise<number> {
    const task = getTask();
    const result = findResult(await task);
    const submittedResult = taskService.submitTask((await task).id, result);
    const newTask = new SubmittedTask(
        (await task).id,
        (await task).operation,
        (await task).left,
        (await task).right,
        (await submittedResult)
    );
    taskRepository.submitTask(newTask);
    return result;
}

function findResult(task: Task): number {
    let result: number;
    switch (task.operation) {
        case 'addition':
            result = task.left + task.right;
            break;
        case 'subtraction':
            result = task.left - task.right;
            break;
        case 'multiplication':
            result = task.left * task.right;
            break;
        case 'division':
            result = task.left / task.right;
            break;
        case 'remainder':
            result = task.left % task.right;
            break;
        default:
            throw new Error(`Operação inválida: ${task.operation}`);
    }
    return result
}

export default {
    getTasks,
    getSubmittedTasks,
    getTask,
    calculateTask
}