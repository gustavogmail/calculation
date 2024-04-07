import Task from "../models/task";
import SubmittedTask from "../models/submittedTask";

const tasks: Task[] = [];
const submittedTasks: SubmittedTask[] = [];

async function getTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    return resolve(tasks)
  });
}

async function getSubmittedTasks(): Promise<SubmittedTask[]> {
  return new Promise((resolve) => {
    return resolve(submittedTasks)
  });
}

async function addTask(task: Task): Promise<Task> {
  return new Promise((resolve, reject) => {
      if (!task.id || !task.operation)
          return reject(new Error(`Invalid task.`));

      const newTask = new Task(task.id, task.operation, task.left, task.right);
      tasks.push(newTask);

      return resolve(newTask);
  })
}

async function submitTask(submittedTask: SubmittedTask): Promise<SubmittedTask> {
  return new Promise((resolve, reject) => {
      if (!submittedTask.id || !submittedTask.result)
          return reject(new Error(`Invalid task.`));

      const newTask = new SubmittedTask(
        submittedTask.id, 
        submittedTask.operation, 
        submittedTask.left, 
        submittedTask.right,
        submittedTask.result
      );
      submittedTasks.push(newTask);

      return resolve(newTask);
  })
}

export default {
  getTasks,
  getSubmittedTasks,
  addTask,
  submitTask
}