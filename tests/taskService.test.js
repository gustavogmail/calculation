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
const axios_1 = __importDefault(require("axios"));
const taskService_1 = __importDefault(require("../src/services/taskService"));
jest.mock('axios');
describe('taskService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should fetch task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTask = { id: '123', operation: 'multiplication', left: 8, right: 2 };
        axios_1.default.get.mockResolvedValueOnce({ data: mockTask });
        const task = yield taskService_1.default.getTask();
        expect(task).toEqual(mockTask);
    }));
    it('should submit task successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const taskId = '123';
        const result = 42;
        const expectedResult = 'Success';
        // Configura o mock para simular a resposta da API
        axios_1.default.post.mockResolvedValueOnce({ data: expectedResult });
        // Chama a função que será testada
        const response = yield taskService_1.default.submitTask(taskId, result);
        // Verifica se a resposta da função corresponde ao esperado
        expect(response).toEqual(expectedResult);
    }));
    it('should log an error if not an AxiosError', () => __awaiter(void 0, void 0, void 0, function* () {
        const errorMessage = 'Unknown error';
        const id = '1';
        const result = 42;
        const error = new Error(errorMessage);
        axios_1.default.post.mockRejectedValueOnce(error);
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { }); // Espionar console.error
        yield expect(taskService_1.default.submitTask(id, result)).rejects.toThrow(errorMessage);
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error submitting task:', error);
        consoleErrorSpy.mockRestore(); // Restaurar o comportamento original de console.error
    }));
});
