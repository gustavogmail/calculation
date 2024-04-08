import axios from 'axios';
import service from '../services/taskService';

jest.mock('axios');

describe('taskService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch task successfully', async () => {
    const mockTask = { id: '123', operation: 'multiplication', left: 8, right: 2 };
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: mockTask });

    const task = await service.getTask();

    expect(task).toEqual(mockTask);
  });

  it('should submit task successfully', async () => {
    const taskId = '123';
    const result = 42;
    const expectedResult = 'Success';

    // Configura o mock para simular a resposta da API
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({ data: expectedResult } );

    // Chama a função que será testada
    const response = await service.submitTask(taskId, result);

    // Verifica se a resposta da função corresponde ao esperado
    expect(response).toEqual(expectedResult);
  });

  it('should log an error if not an AxiosError', async () => {
    const errorMessage = 'Unknown error';
    const id = '1';
    const result = 42;
    const error = new Error(errorMessage);
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(error);
  
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Espionar console.error
  
    await expect(service.submitTask(id, result)).rejects.toThrow(errorMessage);
  
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting task:', error);
  
    consoleErrorSpy.mockRestore(); // Restaurar o comportamento original de console.error
  });
});
