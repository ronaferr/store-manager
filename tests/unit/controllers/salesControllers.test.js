const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const salesService = require('../../../services/salesServices');
const salesControler = require('../../../controllers/salesControllers');

describe('TESTANDO GetAll sales controller', () => {
  describe('Caso de erro', () => {
    const response = {};
    const request = {};

    before(() => {
      Sinon.stub(salesService, 'getAll').resolves(undefined);
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
    })
    after(() => {
      salesService.getAll.restore();
    })
    it('é chamado o status com o código 404', async () => {
      await salesControler.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('é chamado o send com a mensagem "Algo deu errado"', async () => {
      const msgErro = { message: 'Algo deu errado' };
      await salesControler.getAll(request, response);

      expect(response.json.calledWith(msgErro)).to.be.equal(true);
    });
  });
  describe('Caso ok', () => {
    const request = {};
    const response = {};
    before(() => {
      const resultExecute = [];
      Sinon.stub(salesService, 'getAll').resolves(resultExecute);
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
    })
    after(() => {
      salesService.getAll.restore();
    })
    it('retorna array', async function () {
      await salesControler.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith([])).to.be.equal(true);
    })
  });
});