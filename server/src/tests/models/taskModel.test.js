const sinon = require('sinon');
const { expect } = require('chai');
const taskModel = require('../../api/models');

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
});
