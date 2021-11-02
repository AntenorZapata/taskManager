const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { ObjectId } = require('mongodb');
const taskModel = require('../../api/models');

const DBServer = new MongoMemoryServer(); // Sobe servidor do MongoDB em memória
let connectionMock;

before(async () => {
  const urlMock = await DBServer.getUri(); // Pega o url do servidor em memória

  connectionMock = await MongoClient.connect(urlMock, { // "mocka" uma conexão
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Substitui no MongoClient a função 'connect' e resolve na conexão "mockada"
  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
});

after(async () => {
  await MongoClient.connect.restore();
  await DBServer.stop();
});

const INVALID_ID = '617de3e7a58167cdd5f4213a';
const FIRST_ID = ObjectId('60e770a1f02f7e8cab42588a');

const FIRST_TASK = {
  task: 'Atualizar Curriculo',
  author: 'antenor@gmail.com',
  category: 'curriculo',
};

const SECOND_TASK = {
  task: 'Demitir instrutores :P (sorry)',
  user: { email: 'antenor@gmail.com' },
  category: 'Equipe',
};

const THIRD_TASK = {
  task: 'Atualizar Curriculo',
  category: 'curriculo',
};

const USER = { email: 'antenor@gmail.com' };

describe('Get all tasks', () => {
  describe('When there is no task', async () => {
    it('should return an array', async () => {
      const response = await taskModel.getAll();
      expect(response).to.be.an('array');
    });

    it('should return an empty array', async () => {
      const response = await taskModel.getAll();
      expect(response.length).to.be.equal(0);
    });
  });

  describe('when there is at least one task', async () => {
    before(async () => {
      await connectionMock.db('TaskManager').collection('tasks')
        .insertOne(FIRST_TASK, FIRST_TASK.user);
    });

    after(async () => {
      await connectionMock.db('TaskManager').collection('tasks').deleteMany();
    });

    it('should return an array', async () => {
      const response = await taskModel.getAll();
      expect(response).to.be.an('array');
    });

    it('should return a non-empty array', async () => {
      const response = await taskModel.getAll();
      expect(response.length).greaterThan(0);
    });

    it('should return an array of objects', async () => {
      const [task] = await taskModel.getAll();
      expect(task).to.be.an('object');
    });

    it("should return an array of objects with the properties 'author', 'task', 'category'", async () => {
      const [task] = await taskModel.getAll();
      expect(task).to.include.all.keys('task', 'author', 'category');
    });
  });

  describe('when there is more than one task', async () => {
    before(async () => {
      await connectionMock.db('TaskManager').collection('tasks')
        .insertMany([FIRST_TASK, SECOND_TASK]);
    });

    after(async () => {
      await connectionMock.db('TaskManager').collection('tasks').deleteMany();
    });

    it('should return an array with length equal to 2', async () => {
      const response = await taskModel.getAll();
      expect(response.length).to.be.equal(2);
    });
  });
});

describe('Get task by author', () => {
  before(async () => {
    await connectionMock.db('TaskManager').collection('tasks')
      .insertOne(FIRST_TASK);
  });

  after(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  const author = 'antenor@gmail.com';

  it('should return an object', async () => {
    const task = await taskModel.getByAuthor(author);
    expect(task).to.be.an('object');
  });

  it("should return an object with the properties 'author', 'task', 'category'", async () => {
    const task = await taskModel.getByAuthor(author);
    expect(task).to.include.all.keys('author', 'task', 'category');
  });

  it('should return null when author does not exist', async () => {
    const currTask = await taskModel.getByAuthor('lops@gmail.com');
    expect(currTask).to.be.null;
  });
});

describe('Get task by Id', () => {
  before(async () => {
    await connectionMock.db('TaskManager').collection('tasks')
      .insertOne(FIRST_TASK);
  });

  after(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  it('should return a task', async () => {
    const [{ id } = task] = await taskModel.getAll();
    const currTask = await taskModel.getById(id);
    expect(currTask).to.be.an('object');
  });

  it('should return null when id does not exist', async () => {
    const currTask = await taskModel.getById(INVALID_ID);
    expect(currTask).to.be.null;
  });

  it("should return an object with the properties 'author', 'task', 'category'", async () => {
    const [{ id } = task] = await taskModel.getAll();
    const currTask = await taskModel.getById(id);
    expect(currTask).to.include.all.keys('author', 'task', 'category');
  });
});

describe('Create a Task', () => {
  beforeEach(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  after(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  it('should return an array with length of 1', async () => {
    await taskModel.create(THIRD_TASK, USER);
    const task = await taskModel.getAll();
    expect(task.length).to.be.eq(1);
  });

  it('should return an object with the properties "status" and "id"', async () => {
    const taskReturn = await taskModel.create(THIRD_TASK, USER);
    expect(taskReturn).to.be.an('object');
    expect(taskReturn.status).to.be.eq('success');
    expect(taskReturn).has.property('id');
  });

  it('should add one Task', async () => {
    await taskModel.create(THIRD_TASK, USER);
    const [task] = await taskModel.getAll();
    expect(task).to.be.an('object');
  });
});

describe('Remove a task', () => {
  before(async () => {
    await connectionMock.db('TaskManager').collection('tasks')
      .insertOne(FIRST_TASK);
  });

  after(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  it('should return an empty array', async () => {
    const tasks = await taskModel.getAll();
    expect(tasks.length).to.be.eq(1);
    const [{ id } = task] = await taskModel.getAll();
    await taskModel.remove(id);
    const newTasks = await taskModel.getAll();
    expect(newTasks.length).to.be.eq(0);
  });
});

describe('Update a task', () => {
  beforeEach(async () => {
    await connectionMock.db('TaskManager').collection('tasks')
      .insertOne({ _id: '60e770a1f02f7e8cab42588a', ...FIRST_TASK });
  });

  afterEach(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  it('should return an object with new values', async () => {
    const [currTask] = await taskModel.getAll();
    expect(currTask.category).to.be.eq(FIRST_TASK.category);
    expect(currTask.task).to.be.eq(FIRST_TASK.task);
    const newTask = await taskModel.update('60e770a1f02f7e8cab42588a',
      { task: 'new_task', category: 'new_category' }, { email: 'antenor@gmail.com' });

    expect(newTask).to.be.an('object');
    expect(newTask.category).to.be.eq('new_category');
    expect(newTask.task).to.be.eq('new_task');
  });
});
