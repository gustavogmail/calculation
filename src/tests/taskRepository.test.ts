import Task from "../models/task";
import SubmittedTask from "../models/submittedTask";
import repository from "../repositories/taskRepository";

describe("Repository", () => {
  afterEach(() => {
    repository.tasks = [];
    repository.submittedTasks = [];
  });

  describe("getTasks", () => {
    it("should return an empty list of tasks if there are no tasks", async () => {
      // WHEN
      const tasks = await repository.getTasks();

      // THEN
      expect(tasks).toEqual([]);
    });
  });

  describe("getSubmittedTasks", () => {
    it("should return an empty list of submitted tasks if there are no submitted tasks", async () => {
      // WHEN
      const submittedTasks = await repository.getSubmittedTasks();

      // THEN
      expect(submittedTasks).toEqual([]);
    });

    it("should return the task list", async () => {
      // GIVEN
      repository.addTask(new Task("1", "addition", 2, 3));
      repository.addTask(new Task("2", "subtraction", 5, 3));

      // WHEN
      const tasks = await repository.getTasks();

      // THEN
      expect(tasks).toHaveLength(2);
    });

    it("should return the list of sent tasks", async () => {
      // GIVEN
      repository.submitTask(new SubmittedTask("1", "addition", 2, 3, "5"));
      repository.submitTask(new SubmittedTask("2", "subtraction", 5, 3, "2"));

      // WHEN
      const submittedTasks = await repository.getSubmittedTasks();

      // THEN
      expect(submittedTasks).toHaveLength(2);
    });
  });

  describe("addTask", () => {
    it('should reject if task id or operation is missing', async () => {
      // WHEN
      const invalidTask: Task = { id: '', operation: 'add', left: 5, right: 10 };

      // THEN
      await expect(repository.addTask(invalidTask)).rejects.toThrow('Invalid task.');
    });
  });

  describe("submitTask", () => {
    it('should reject if task id or operation is missing', async () => {
      // WHEN
      const invalidTask: SubmittedTask = { id: '', operation: 'add', left: 5, right: 10, result: "15" };

      // THEN
      await expect(repository.submitTask(invalidTask)).rejects.toThrow('Invalid task.');
    });
  });
});