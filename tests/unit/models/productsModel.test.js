const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const connection = require("../../../models/connection");
const productsModel = require('../../../models/productsModel');

describe('GET ALL', () => {
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
    it('retorna array', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.an('array');
    })
    it('retorna array cheio', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.not.empty;
    })
  });
});
describe('GET BY ID', () => {
  describe('Retorna um produto', () => {
    const mock = [[
      { id: 1, name: 'Martelo de Thor' },
    ]];
    const id = 1;
    before(async () => {
      Sinon.stub(connection, 'execute').resolves(mock);
    })
    after(async () => {
      Sinon.restore();
    })
    it('retorna array', async function () {
      const resultado = await productsModel.getById(id);
      expect(resultado).to.be.an('array');
    })
    it('retorna array cheio', async function () {
      const resultado = await productsModel.getById(id);
      expect(resultado).to.be.not.empty;
    })
  });
});