const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

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
    it('retorna array cheio', async function () {
      Sinon.stub(productsModel, 'getAll').resolves(resultExecute);
      const resultExecute = [{ id: 1, name: xablau }];
      const resultado = await productsService.getAll();
      expect(resultado).to.be.not.empty;
    })
  });
});