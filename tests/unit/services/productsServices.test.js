const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");
const connection = require('../../../models/connection');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('GET ALL', () => {
  before(() => {
    const resultExecute = [];
    Sinon.stub(productsModel, 'getAll').resolves(resultExecute);
  })
  after(() => {
    Sinon.restore();
  })
  describe('Caso ok', () => {
    it('retorna array', async function () {
      const resultado = await productsService.getAll();
      expect(resultado).to.be.an('array');
    })
    it('retorna array vazio', async function () {
      const resultado = await productsService.getAll();
      expect(resultado).to.be.empty;
    })
  });
});

describe('GET BY ID', () => {
  before(async () => {
    const execute = [[]];

    Sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe produto com ID', () => {
    it('retorna null', async () => {
      const response = await productsService.getById();

      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto com o ID informado', () => {

    before(() => {
      Sinon.stub(productsModel, 'getById')
        .resolves({ id: 1, name: 'Martelo de Thor' });
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.getById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productsService.getById(1);

      expect(response).to.be.not.empty;
    });
  });
});