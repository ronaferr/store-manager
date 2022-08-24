const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesServices');

describe('GET ALL sales services', () => {
  before(() => {
    const resultExecute = [];
    Sinon.stub(salesModel, 'getAll').resolves(resultExecute);
  })
  after(() => {
    salesModel.getAll.restore();
  })
  describe('Caso ok', () => {
    it('retorna array', async function () {
      const resultado = await salesService.getAll();
      expect(resultado).to.be.an('array');
    })
    it('retorna array vazio', async function () {
      const resultado = await salesService.getAll();
      expect(resultado).to.be.empty;
    })
  });
});