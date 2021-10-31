const sinon = require('sinon');
const { expect } = require('chai');
const taskService = require('../../api/services');
const taskModel = require('../../api/models');

const TASK_ID = '617eee34bae0b65c7efad261';
const INVALID_ID = '617eee34bae0b65c7efad262';

const FIRST_TASK = {
  id: TASK_ID,
  task: 'task',
  author: 'task_author',
  category: 'task_category',
};

const VALID_TASK = {
  task: 'task',
  author: 'antenor@gmail.com',
  category: 'task_category',
};

const SECOND_TASK = {
  id: TASK_ID,
  task: 'test_task',
  author: 'antenor@gmail.com',
  category: 'test_category',
};

const CREATE_RETURN = {
  status: 'success',
  id: '617efb66818cd455a0b5835c',
};

const INCORRECT_CATEGORY = {
  id: TASK_ID,
  task: 'task',
  author: 'antenor@gmail.com',
  category: '',
};

const INCORRECT_TASK = {
  id: TASK_ID,
  task: '',
  author: 'antenor@gmail.com',
  category: 'Category_test',
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

  describe('when task exists', async () => {
    before(async () => {
      sinon.stub(taskModel, 'getById').resolves(FIRST_TASK);
    });

    after(async () => {
      taskModel.getById.restore();
    });

    it('should return a task', async () => {
      const task = await taskService.getById(TASK_ID);
      expect(task).to.be.an('object');
      expect(task).to.include.all.keys('author', 'task', 'category');
    });
  });
});

describe('Create a Task Service', () => {
  describe('When the fields are correct', () => {
    before(async () => {
      sinon.stub(taskModel, 'create').resolves(CREATE_RETURN);
    });

    after(async () => {
      taskModel.create.restore();
    });

    it('should create a task', async () => {
      const task = await taskService.create(VALID_TASK);
      expect(task).to.be.an('object');
      expect(task).haveOwnProperty('status');
      expect(task).haveOwnProperty('id');
    });
  });

  describe('When the fields are incorrect', () => {
    it('should return an error of author', async () => {
      try {
        await taskService.create(FIRST_TASK);
      } catch (err) {
        expect(err).to.be.an('error');
        expect(err.message).to.be.eq('"author" must be a valid email');
        expect(err.code).to.be.eq('invalid_fields');
        expect(err.statusCode).to.be.eq(400);
      }
    });
  });

  it('should return an error of category', async () => {
    try {
      await taskService.create(INCORRECT_CATEGORY);
    } catch (err) {
      expect(err).to.be.an('error');
      expect(err.message).to.be.eq('"category" is not allowed to be empty');
      expect(err.code).to.be.eq('invalid_fields');
      expect(err.statusCode).to.be.eq(400);
    }
  });

  it('should return an error of task', async () => {
    try {
      await taskService.create(INCORRECT_TASK);
    } catch (err) {
      expect(err).to.be.an('error');
      expect(err.message).to.be.eq('"task" is not allowed to be empty');
      expect(err.code).to.be.eq('invalid_fields');
      expect(err.statusCode).to.be.eq(400);
    }
  });
});

describe('Remove a task Service', () => {
  it('should return an error if task does not exist', async () => {
    try {
      await taskService.remove(INCORRECT_TASK.id);
    } catch (err) {
      expect(err).to.be.an('error');
      expect(err.message).to.be.eq('Task does not exist');
      expect(err.code).to.be.eq('not_found');
      expect(err.statusCode).to.be.eq(404);
    }
  });
});

describe('Update a task Service', () => {
  before(async () => {
    sinon.stub(taskModel, 'update').resolves(SECOND_TASK);
  });

  after(async () => {
    taskModel.update.restore();
  });

  it('should return an error if task does not exist', async () => {
    try {
      await taskService.remove(INVALID_ID);
    } catch (err) {
      expect(err).to.be.an('error');
      expect(err.message).to.be.eq('Task does not exist');
      expect(err.code).to.be.eq('not_found');
      expect(err.statusCode).to.be.eq(404);
    }
  });
});
