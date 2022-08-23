const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const connection = require("../../../models/connection");
const productsModel = require('../../../models/productsModel');

describe('Testando Camada Models', () => {
  describe('Retorna todos os produtos', () => {
    const mock = [[
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ]];
    before(async () => {
      Sinon.stub(connection, 'execute').resolves(mock);
    })
    after(async () => {
      Sinon.restore();
    })
    it('retorna um array', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.an('array');
    })
    it('retorna um array cheio', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.not.empty;
    })
  });
});
describe('Model getById', () => {
  before(async () => {
    const execute = [[]];
    Sinon.stub(connection, 'execute').resolves(execute);
  })
  after(async () => {
    connection.execute.restore();
  })

  describe('Retorno Null', () => {
    it('Retorno Null', async function () {
      const resultado = await productsModel.getById();
      expect(resultado).to.be.equal(null);
    })
  });
  
  describe('Retorna um produto', () => {
    before(async () => {
      const mock = { id: 1, name: 'Martelo de Thor' };
      Sinon.stub(productsModel, 'getById').resolves(mock);
    })
    after(async () => {
      productsModel.getById.restore();
    })
    it('retorna um objeto', async function () {
      const resultado = await productsModel.getById(1);
      expect(resultado).to.be.an('object');
    })
    it('retorna um objeto cheio', async function () {
      const resultado = await productsModel.getById(1);
      expect(resultado).to.be.not.empty;
    })
  });
});
describe('Cadastrando produtos', async () => {
  const mock = {
    "name": "ProdutoX"
  };

  before(async () => {
    const execute = {
      "id": 4,
      "name": "ProdutoX"
    };

    Sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async() => {
    connection.execute.restore();
  });

  describe('inserido com sucesso', async () => {
    it('retorna um objeto', async () => {
      const response = await productsModel.create(mock);

      expect(response).to.be.an('object');
    });

    it('objeto possui ID do produto', async () => {
      const response = await productsModel.create(mock);

      expect(response).to.have.a.property('id');
    });
  });
});