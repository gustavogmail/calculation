"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskController_1 = __importDefault(require("../src/controllers/taskController"));
const taskRepository_1 = __importDefault(require("../src/repositories/taskRepository"));
const taskService_1 = __importDefault(require("../src/services/taskService"));
const task_1 = __importDefault(require("../src/models/task"));
jest.mock('../src/services/taskService');
jest.mock('../src/repositories/taskRepository');
describe('Controller Tests', () => {
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
            status: jest.fn(() => mockResponse),
            send: jest.fn(),
        };
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getTasks', () => {
        it('should return tasks', () => __awaiter(void 0, void 0, void 0, function* () {
            const tasks = yield taskController_1.default.getTasks(mockRequest, mockResponse);
            expect(mockResponse.json).toHaveBeenCalledWith(tasks);
        }));
    });
    describe('getSubmittedTasks', () => {
        it('should return submitted tasks', () => __awaiter(void 0, void 0, void 0, function* () {
            const tasks = yield taskController_1.default.getSubmittedTasks(mockRequest, mockResponse);
            expect(mockResponse.json).toHaveBeenCalledWith(tasks);
        }));
    });
    describe('getTask', () => {
        it('should return a task', () => __awaiter(void 0, void 0, void 0, function* () {
            const taskData = { id: 1, operation: 'addition', left: 2, right: 3 };
            const mockGetTask = jest.fn();
            taskService_1.default.getTask = mockGetTask;
            mockGetTask.mockResolvedValue(taskData);
            const result = yield taskController_1.default.getTask();
            expect(result).toEqual(taskData);
            expect(taskRepository_1.default.addTask).toHaveBeenCalledWith(expect.any(task_1.default));
        }));
    });
    describe('calculateTask', () => {
        it('should calculate task properly', () => __awaiter(void 0, void 0, void 0, function* () {
            const taskData = { id: 1, operation: 'addition', left: 2, right: 3, result: 5 };
            const mockGetTask = jest.fn();
            taskController_1.default.getTask = mockGetTask;
            const mockFindResult = jest.fn();
            mockFindResult.mockResolvedValue(taskData);
            taskController_1.default.findResult = mockFindResult;
            const mockSubmitTask = jest.fn();
            taskService_1.default.submitTask = mockSubmitTask;
            const mockRepoSubmitTask = jest.fn();
            taskRepository_1.default.submitTask = mockRepoSubmitTask;
            const result = yield taskController_1.default.calculateTask();
            expect(result).toEqual(taskData.result);
            expect(taskService_1.default.submitTask).toHaveBeenCalled();
            expect(taskRepository_1.default.submitTask).toHaveBeenCalled();
        }));
    });
});
