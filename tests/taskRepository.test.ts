import Task from "../src/models/task";
import SubmittedTask from "../src/models/submittedTask";
import repository from "../src/repositories/taskRepository";

describe("Repository", () => {
  afterEach(() => {
    // Limpa os arrays após cada teste
    repository.tasks = [];
    repository.submittedTasks = [];
});

  describe("getTasks", () => {
    it("deve retornar uma lista vazia de tarefas se não houver tarefas", async () => {
      const tasks = await repository.getTasks();
      expect(tasks).toEqual([]);
    });

    it("deve retornar a lista de tarefas", async () => {
      // Adiciona algumas tarefas para teste
      repository.addTask(new Task("1", "addition", 2, 3));
      repository.addTask(new Task("2", "subtraction", 5, 3));

      const tasks = await repository.getTasks();
      expect(tasks).toHaveLength(2);
    });
  });

  describe("getSubmittedTasks", () => {
    it("deve retornar uma lista vazia de tarefas enviadas se não houver tarefas enviadas", async () => {
      const submittedTasks = await repository.getSubmittedTasks();
      expect(submittedTasks).toEqual([]);
    });

    it("deve retornar a lista de tarefas enviadas", async () => {
      // Adiciona algumas tarefas enviadas para teste
      repository.submitTask(new SubmittedTask("1", "addition", 2, 3, "5"));
      repository.submitTask(new SubmittedTask("2", "subtraction", 5, 3, "2"));

      const submittedTasks = await repository.getSubmittedTasks();
      expect(submittedTasks).toHaveLength(2);
    });
  });

  describe("addTask", () => {
    it('should reject if task id or operation is missing', async () => {
      const invalidTask: Task = { id: '', operation: 'add', left: 5, right: 10 };
      await expect(repository.addTask(invalidTask)).rejects.toThrow('Invalid task.');
    });
  });

  describe("submitTask", () => {
    it('should reject if task id or operation is missing', async () => {
      const invalidTask: SubmittedTask = { id: '', operation: 'add', left: 5, right: 10, result: "15" };
      await expect(repository.submitTask(invalidTask)).rejects.toThrow('Invalid task.');
    });
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