const { expect } = require('chai');
const sinon = require('sinon');
const taskController = require('../../api/controllers');
const taskService = require('../../api/services');

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
  });
});
