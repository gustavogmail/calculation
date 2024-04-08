import { Request, Response } from 'express';
import controller from '../controllers/taskController';
import taskRepository from '../repositories/taskRepository';
import taskService from '../services/taskService';
import Task from '../models/task';

jest.mock('../services/taskService');
jest.mock('../repositories/taskRepository');

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

  describe('getTask', () => {
    it('should return a task', async () => {
      // GIVEN
      const taskData = { id: 1, operation: 'addition', left: 2, right: 3 };
      const mockGetTask = jest.fn();
      taskService.getTask = mockGetTask;
      mockGetTask.mockResolvedValue(taskData);

      // WHEN
      const result = await controller.getTask();

      // THEN
      expect(result).toEqual(taskData);
      expect(taskRepository.addTask).toHaveBeenCalledWith(expect.any(Task));
    });
  });

  describe('getTasks', () => {
    it('should return tasks', async () => {
      // WHEN
      const tasks = await controller.getTasks(mockRequest as Request, mockResponse as Response);

      // THEN
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });
  });


  describe('getSubmittedTasks', () => {
    it('should return submitted tasks', async () => {
      // WHEN
      const tasks = await controller.getSubmittedTasks(mockRequest as Request, mockResponse as Response);
      // THEN
      expect(mockResponse.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe('calculateTask', () => {
    it('should calculate task properly', async () => {
      // GIVEN
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

      // WHEN
      const result = await controller.calculateTask();

      // THEN
      expect(result).toEqual(taskData.result);
      expect(taskService.submitTask).toHaveBeenCalled();
      expect(taskRepository.submitTask).toHaveBeenCalled();
    });
  });

});
