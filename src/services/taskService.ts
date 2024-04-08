import axios, { AxiosError } from 'axios';
import Task from '../models/task';

const path = 'https://interview.adpeai.com/api/v1';

async function getTask(): Promise<Task> {
  const url = path + '/get-task';
  const response = await axios.get<Task>(url);
  const data = await response.data;
  return data
}

async function submitTask(id: string, result: number): Promise<string> {
  const url = path + '/submit-task';
  const body = {
    id: id,
    result: result
  };
  try {
    const response = await axios.post<string>(url, body);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response && axiosError.response.status === 400) {
        return axiosError.response.status.toString();
      }

      if (axiosError.response && axiosError.response.status === 404) {
        return axiosError.response.status.toString();
      }

      if (axiosError.response && axiosError.response.status === 503) {
        return axiosError.response.status.toString();
      }

    } else {
      console.error('Error submitting task:', error);
    }
    throw error;
  }
}

export default {
  getTask,
  submitTask
}