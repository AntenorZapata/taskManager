const sinon = require('sinon');
const { expect } = require('chai');
const taskService = require('../../api/services');
const taskModel = require('../../api/models');
const { ApiError } = require('../../api/utils/ApiError');
const { checkIfTaskExists } = require('../../api/services/validations/taskValidations');

const TASK_ID = '617eee34bae0b65c7efad261';
const INVALID_ID = '617eee34bae0b65c7efad262';

const FIRST_TASK = {
  id: TASK_ID,
  task: 'task',
  author: 'task_author',
  category: 'task_category',
};

const SECOND_TASK = {
  id: TASK_ID,
  task: 'test_task',
  author: 'test_author',
  category: 'test_category',
};

describe('Get all tasks Service', () => {
  describe('When there is no task', async () => {
    before(async () => {
      sinon.stub(taskModel, 'getAll').resolves([]);
    });

    after(async () => {
      taskModel.getAll.restore();
    });

    it('should return an array', async () => {
      const response = await taskService.getAll();
      expect(response).to.be.an('array');
    });

    it('should return an empty array', async () => {
      const response = await taskService.getAll();
      expect(response).to.be.empty;
    });
  });

  describe('when there is at least one task', async () => {
    before(async () => {
      sinon.stub(taskModel, 'getAll').resolves([FIRST_TASK]);
    });

    after(async () => {
      taskModel.getAll.restore();
    });

    it('should return an array', async () => {
      const response = await taskService.getAll();
      expect(response).to.be.an('array');
    });

    it('should return a non-empty array', async () => {
      const response = await taskService.getAll();
      expect(response.length).greaterThan(0);
    });

    it('should return an array of objects', async () => {
      const [task] = await taskService.getAll();
      expect(task).to.be.an('object');
    });

    it("should return an array of objects with the properties 'author', 'task', 'category'", async () => {
      const [task] = await taskService.getAll();
      expect(task).to.include.all.keys('author', 'task', 'category');
    });
  });

  describe('when there is more than one task', async () => {
    before(async () => {
      sinon.stub(taskModel, 'getAll').resolves([FIRST_TASK, SECOND_TASK]);
    });

    after(async () => {
      taskModel.getAll.restore();
    });

    it('should return an array with length equal to 2', async () => {
      const response = await taskService.getAll();
      expect(response.length).to.be.equal(2);
    });
  });
});

describe('Get task by Id Service', () => {
  describe('When task doest not exist', () => {
    before(async () => {
      sinon.stub(taskModel, 'getById').resolves(null);
    });

    after(async () => {
      taskModel.getById.restore();
    });

    it('should return an error', async () => {
      try {
        await taskService.getById(INVALID_ID);
      } catch (err) {
        expect(err).to.be.an('error');
        expect(err.message).to.be.eq('Task does not exist');
        expect(err.code).to.be.eq('not_found');
        expect(err.statusCode).to.be.eq(404);
      }
    });
  });

  describe('when there is at least one task', async () => {
    before(async () => {
      sinon.stub(taskModel, 'getById').resolves(FIRST_TASK);
    });

    after(async () => {
      taskModel.getById.restore();
    });

    it('should return a task', async () => {
      const task = await taskService.getById(TASK_ID);
      expect(task).to.be.an('object');
    });

    it("should return an object with the properties 'author', 'task', 'category'", async () => {
      const task = await taskService.getById(TASK_ID);
      expect(task).to.include.all.keys('author', 'task', 'category');
    });
  });
});
