import { Request, Response } from 'express';
import controller from '../src/controllers/taskController';
import taskRepository from '../src/repositories/taskRepository';
import taskService from '../src/services/taskService';
import Task from '../src/models/task';

jest.mock('../src/services/taskService');
jest.mock('../src/repositories/taskRepository');

describe('Controller Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(() => mockResponse as Response),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should return tasks', async () => {
      const tasks = await controller.getTasks(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });
  });

  
  describe('getSubmittedTasks', () => {
    it('should return submitted tasks', async () => {
      const tasks = await controller.getSubmittedTasks(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe('getTask', () => {
    it('should return a task', async () => {
      const taskData = { id: 1, operation: 'addition', left: 2, right: 3 };
      const mockGetTask = jest.fn();
      taskService.getTask = mockGetTask;
      mockGetTask.mockResolvedValue(taskData);
      
      const result = await controller.getTask();

      expect(result).toEqual(taskData);
      expect(taskRepository.addTask).toHaveBeenCalledWith(expect.any(Task));
    });
  });

  describe('calculateTask', () => {
    it('should calculate task properly', async () => {
      const taskData = { id: 1, operation: 'addition', left: 2, right: 3, result: 5 };
      const mockGetTask = jest.fn();
      controller.getTask = mockGetTask;
      const mockFindResult = jest.fn();
      mockFindResult.mockResolvedValue(taskData);
      controller.findResult = mockFindResult;
      const mockSubmitTask = jest.fn();
      taskService.submitTask = mockSubmitTask;
      const mockRepoSubmitTask = jest.fn();
      taskRepository.submitTask = mockRepoSubmitTask;

      const result = await controller.calculateTask();

      expect(result).toEqual(taskData.result);
      expect(taskService.submitTask).toHaveBeenCalled();
      expect(taskRepository.submitTask).toHaveBeenCalled();
    });
  });

});
