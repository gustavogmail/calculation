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
const task_1 = __importDefault(require("../src/models/task"));
const submittedTask_1 = __importDefault(require("../src/models/submittedTask"));
const taskRepository_1 = __importDefault(require("../src/repositories/taskRepository"));
describe("Repository", () => {
    afterEach(() => {
        // Limpa os arrays após cada teste
        taskRepository_1.default.tasks = [];
        taskRepository_1.default.submittedTasks = [];
    });
    describe("getTasks", () => {
        it("deve retornar uma lista vazia de tarefas se não houver tarefas", () => __awaiter(void 0, void 0, void 0, function* () {
            const tasks = yield taskRepository_1.default.getTasks();
            expect(tasks).toEqual([]);
        }));
        it("deve retornar a lista de tarefas", () => __awaiter(void 0, void 0, void 0, function* () {
            // Adiciona algumas tarefas para teste
            taskRepository_1.default.addTask(new task_1.default("1", "addition", 2, 3));
            taskRepository_1.default.addTask(new task_1.default("2", "subtraction", 5, 3));
            const tasks = yield taskRepository_1.default.getTasks();
            expect(tasks).toHaveLength(2);
        }));
    });
    describe("getSubmittedTasks", () => {
        it("deve retornar uma lista vazia de tarefas enviadas se não houver tarefas enviadas", () => __awaiter(void 0, void 0, void 0, function* () {
            const submittedTasks = yield taskRepository_1.default.getSubmittedTasks();
            expect(submittedTasks).toEqual([]);
        }));
        it("deve retornar a lista de tarefas enviadas", () => __awaiter(void 0, void 0, void 0, function* () {
            // Adiciona algumas tarefas enviadas para teste
            taskRepository_1.default.submitTask(new submittedTask_1.default("1", "addition", 2, 3, "5"));
            taskRepository_1.default.submitTask(new submittedTask_1.default("2", "subtraction", 5, 3, "2"));
            const submittedTasks = yield taskRepository_1.default.getSubmittedTasks();
            expect(submittedTasks).toHaveLength(2);
        }));
    });
    describe("addTask", () => {
        it('should reject if task id or operation is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidTask = { id: '', operation: 'add', left: 5, right: 10 };
            yield expect(taskRepository_1.default.addTask(invalidTask)).rejects.toThrow('Invalid task.');
        }));
    });
    describe("submitTask", () => {
        it('should reject if task id or operation is missing', () => __awaiter(void 0, void 0, void 0, function* () {
            const invalidTask = { id: '', operation: 'add', left: 5, right: 10, result: "15" };
            yield expect(taskRepository_1.default.submitTask(invalidTask)).rejects.toThrow('Invalid task.');
        }));
    });
    /*
    describe("addTask", () => {
      it("deve adicionar uma nova tarefa", async () => {
        const taskToAdd = new Task("1", "addition", 2, 3);
        await repository.addTask(taskToAdd);
  
        const tasks = await repository.getTasks();
        expect(tasks).toContainEqual(taskToAdd);
      });
  
      it("deve rejeitar uma tarefa inválida", async () => {
        await expect(repository.addTask(new Task())).rejects.toThrowError("Invalid task.");
      });
    });
  
    describe("submitTask", () => {
      it("deve adicionar uma nova tarefa enviada", async () => {
        const submittedTaskToAdd = new SubmittedTask("1", "addition", 2, 3, "5");
        await repository.submitTask(submittedTaskToAdd);
  
        const submittedTasks = await repository.getSubmittedTasks();
        expect(submittedTasks).toContainEqual(submittedTaskToAdd);
      });
  
      it("deve rejeitar uma tarefa enviada inválida", async () => {
        await expect(repository.submitTask(new SubmittedTask())).rejects.toThrowError("Invalid task.");
      });
    });
    */
});
