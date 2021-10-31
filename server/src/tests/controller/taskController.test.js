const { expect } = require('chai');
const sinon = require('sinon');
const taskController = require('../../api/controllers');
const taskService = require('../../api/services');
const { ApiError } = require('../../api/utils/ApiError');

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
  author: 'antenor@gmail.com',
  category: 'test_category',
};

const CREATE_RETURN = {
  status: 'success',
  id: '617efb66818cd455a0b5835c',
};

const NULL = null;

describe('Get all tasks in the DB', () => {
  describe('When there is no task in the DB', async () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'getAll').resolves([]);

      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    after(() => {
      taskService.getAll.restore();
    });

    it('should return a 200 HTTP status', async () => {
      await taskController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.eq(true);
    });

    it('should return an array in json format', async () => {
      await taskController.getAll(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.eq(true);
    });
  });

  describe('When there is at least one task in the DB', async () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'getAll').resolves([FIRST_TASK]);

      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    after(() => {
      taskService.getAll.restore();
    });

    it('should return an array with one task', async () => {
      await taskController.getAll(request, response);
      expect(response.json.calledWith([FIRST_TASK])).to.be.eq(true);
    });
  });

  describe('When there is many tasks in the DB', async () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'getAll').resolves([FIRST_TASK, SECOND_TASK]);

      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    after(() => {
      taskService.getAll.restore();
    });

    it('should return an array with two tasks', async () => {
      await taskController.getAll(request, response);
      expect(response.json.calledWith([FIRST_TASK, SECOND_TASK])).to.be.eq(true);
    });
  });
});

describe('Get task by Id Controller', () => {
  describe('When task exists', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'getById').resolves(FIRST_TASK);

      request.body = {};
      request.params = FIRST_TASK.id;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    after(() => {
      taskService.getById.restore();
    });

    it('should return a task', async () => {
      await taskController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(FIRST_TASK)).to.be.eq(true);
    });
  });

  describe('When task does not exists', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'getById').resolves({});

      request.body = {};
      request.params = INVALID_ID;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    after(() => {
      taskService.getById.restore();
    });

    it('should return an empty object', async () => {
      await taskController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Create a Task Controller', () => {
  describe('When the fields are correct', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'create').resolves(CREATE_RETURN);

      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    after(() => {
      taskService.create.restore();
    });

    it('should create a task', async () => {
      await taskController.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
      expect(response.json.calledWith(CREATE_RETURN)).to.be.equal(true);
    });
  });
});

describe('Remove a Task Controller', () => {
  describe('When the fields are correct', () => {
    const request = {};
    const response = {};

    before(() => {
      sinon.stub(taskService, 'remove').resolves(NULL);

      request.body = {};
      request.params = TASK_ID;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(response);
    });

    after(() => {
      taskService.remove.restore();
    });

    it('should remove a task', async () => {
      await taskController.remove(request, response);
      expect(response.status.calledWith(204)).to.be.equal(true);
      expect(response.json.calledWith(NULL)).to.be.equal(true);
    });
  });
});

describe('Update a task Controller', () => {
  const request = {};
  const response = {};

  before(() => {
    sinon.stub(taskService, 'update').resolves(FIRST_TASK);

    request.params = TASK_ID;

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);
  });

  after(() => {
    taskService.update.restore();
  });

  it('should return an object', async () => {
    await taskController.update(request, response);
    expect(response.status.calledWith(200)).to.be.equal(true);
    expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    expect(response.json.calledWith(FIRST_TASK)).to.be.equal(true);
  });
});
