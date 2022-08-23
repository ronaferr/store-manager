const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");
const connection = require("../../../models/connection");

const productsModel = require('../../../models/productsModel');

describe('GET ALL', () => {
  before(() => {
    const resultExecute = [];
    Sinon.stub(connection, 'execute').resolves([resultExecute]);
  })
  after(() => {
    Sinon.restore();
  })
  describe('Caso ok', () => {
    it('retorna array', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.an('array');
    })
    it('retorna array vazio', async function () {
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.empty;
    })
    it('retorna array cheio', async function () {
      Sinon.stub(connection, 'execute').resolves([resultExecute]);
      const resultExecute = [{id: 1, name: xablau}];
      const resultado = await productsModel.getAll();
      expect(resultado).to.be.not.empty;
    })
  });
});