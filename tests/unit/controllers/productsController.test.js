const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsService = require('../../../services/productsService');
const productsModel = require('../../../models/productsModel');
const productsControler = require('../../../controllers/productsController');

describe('GET ALL', () => {
  describe('Caso ok', () => {
    before(() => {
      const resultExecute = [];
      Sinon.stub(productsService, 'getAll').resolves(resultExecute);
    })
    after(() => {
      Sinon.restore();
    })
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
  describe('Caso de erro', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = Sinon.stub()
        .returns(response);
      response.send = Sinon.stub()
        .returns();
    })
    it('é chamado o status com o código 500', async () => {
      await productsControler.getAll(request, response);

      expect(response.status.calledWith(500)).to.be.equal(true);
    });
    it('é chamado o send com a mensagem "Algo deu errado"', async () => {
      await productsControler.getAll(request, response);

      expect(response.send.calledWith('Algo deu errado')).to.be.equal(true);
    });
  });
});

describe('GET BY ID', () => {
  describe('Caso ok', () => {
    const request = {};
    const response = {};
    const mock = { id: 1, name: 'Martelo de Thor' };
    before(() => {
      request.params = {
        id: 1,
      };

      response.status = Sinon.stub()
        .returns(response);
      response.json = Sinon.stub()
        .returns();
      
      const resultExecute = [];
      Sinon.stub(productsModel, 'getById').resolves(mock);
    })
    after(() => {
      Sinon.restore();
    })
    it('retorna array', async function () {
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
      await productsControler.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(mock)).to.be.equal(true);
    })
  });
  describe('Caso de erro', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 99,
      };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
      
      Sinon.stub(productsModel, 'getById').resolves(null);
    });
    after(() => {
      Sinon.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await productsControler.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('é chamado o send com a mensagem "Product not found"', async () => {
      await productsControler.getById(request, response);

      expect(response.send.calledWith('Product not found')).to.be.equal(true);
    });
  });
});
