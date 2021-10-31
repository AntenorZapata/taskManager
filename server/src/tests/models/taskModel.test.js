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

describe('Get all tasks', () => {
  after(async () => {
    await MongoClient.connect.restore();
    await DBServer.stop();
  });

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
        .insertOne({ task: 'Atualizar Curriculo', author: 'antenor@gmail.com', category: 'curriculo' });
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
});

describe('Get task by author', () => {
  before(async () => {
    await connectionMock.db('TaskManager').collection('tasks')
      .insertOne({ task: 'Atualizar Curriculo', author: 'antenor@gmail.com', category: 'curriculo' });
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
});
