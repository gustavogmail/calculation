import Task from 'src/models/task';
import taskService from '../services/taskService';

async function getTask(): Promise<Task> {
    const task = taskService.getTask();
    console.log('============ GOT TASK ============ ');
    console.log('TASK ID', (await task).id);
    console.log('TASK OPERATION', (await task).operation);
    console.log('TASK LEFT', (await task).left);
    console.log('TASK RIGHT', (await task).right);
    return task;
}

async function calculateTask(): Promise<number> {
    const task = getTask();
    const result = findResult(await task);
    const submittedResult = taskService.submitTask((await task).id, result);
    console.log('============ GOT SUBMITTED ====== ');
    console.log(await submittedResult);
    return result
}

function findResult(task: Task): number {
    let result: number;
    switch (task.operation) {
        case 'addition':
            console.log('============ START OP ==== ');
            console.log('ADIÇÃO');
            result = task.left + task.right;
            console.log('RESULT', result);
            break;
        case 'subtraction':
            console.log('SUB');
            result = task.left - task.right;
            console.log('RESULT', result);
            break;
        case 'multiplication':
            result = task.left * task.right;
            console.log('MULT', result);
            break;
        case 'division':
            result = task.left / task.right;
            console.log('DIV', result);
            break;
        case 'remainder':
            result = task.left % task.right;
            console.log('REM', result);
            break;
        default:
            throw new Error(`Operação inválida: ${task.operation}`);
    }
    return result
}

export default {
    getTask,
    calculateTask
}