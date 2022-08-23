const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsService = require('../../../models/productsService');
const productsControler = require('../../../controllers/productsController');

describe('GET ALL', () => {
  before(() => {
    const resultExecute = [];
    Sinon.stub(productsService, 'getAll').resolves(resultExecute);
  })
  after(() => {
    Sinon.restore();
  })
  describe('Caso ok', () => {
    it('retorna array', async function () {
      const request = {};
      const response = {};
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      await productsControler.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith([])).to.be.equal(true);
    })
  });
});