const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const taskModel = require('../../api/models');

const DBServer = new MongoMemoryServer(); // Sobe servidor do MongoDB em memória
let connectionMock;

before(async () => {
  const urlMock = await DBServer.getUri(); // Pega o url do servidor em memória
  // "mocka" uma conexão
  connectionMock = await MongoClient.connect(urlMock, {
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

const FIRST_TASK = {
  task: 'Atualizar Curriculo',
  author: 'antenor@gmail.com',
  category: 'curriculo',
};

const SECOND_TASK = {
  task: 'Demitir instrutores :P (sorry)',
  author: 'antenor@gmail.com',
  category: 'Equipe',
};

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
        .insertOne(FIRST_TASK);
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
      expect(task).to.include.all.keys('author', 'task', 'category');
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
    expect(currTask).to.be.eq(null);
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
    const currTask = await taskModel.getById('617de3e7a58167cdd5f4213a');
    expect(currTask).to.be.eq(null);
  });

  it("should return an object with the properties 'author', 'task', 'category'", async () => {
    const [{ id } = task] = await taskModel.getAll();
    const currTask = await taskModel.getById(id);
    expect(currTask).to.include.all.keys('author', 'task', 'category');
  });
});

describe.only('Create Task', () => {
  beforeEach(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  after(async () => {
    await connectionMock.db('TaskManager').collection('tasks').deleteMany();
  });

  it('should return an array with length of 1', async () => {
    await taskModel.create(FIRST_TASK);
    const task = await taskModel.getAll();
    expect(task.length).to.be.eq(1);
  });

  it('should add one Task', async () => {
    await taskModel.create(FIRST_TASK);
    const [task] = await taskModel.getAll();
    expect(task).to.be.an('object');
  });
});
