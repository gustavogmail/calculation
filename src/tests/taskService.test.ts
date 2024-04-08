import axios from 'axios';
import service from '../services/taskService';

jest.mock('axios');

describe('taskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch task successfully', async () => {
    // GIVEN
    const mockTask = { id: '123', operation: 'multiplication', left: 8, right: 2 };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockTask });

    // WHEN
    const task = await service.getTask();

    // THEN
    expect(task).toEqual(mockTask);
  });

  it('should submit task successfully', async () => {
    // GIVEN
    const taskId = '123';
    const result = 42;
    const expectedResult = 'Success';
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({ data: expectedResult } );

    // WHEN
    const response = await service.submitTask(taskId, result);

    // THEN
    expect(response).toEqual(expectedResult);
  });

  it('should log an error if not an AxiosError', async () => {
    // GIVEN
    const errorMessage = 'Unknown error';
    const id = '1';
    const result = 42;
    const error = new Error(errorMessage);
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(error);
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); 
  
    // WHEN
    await expect(service.submitTask(id, result)).rejects.toThrow(errorMessage);
  
    // THEN
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting task:', error);
    consoleErrorSpy.mockRestore();
  });
});
