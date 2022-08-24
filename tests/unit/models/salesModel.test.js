const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const connection = require("../../../models/connection");
const salesModel = require('../../../models/salesModel');

describe('Testando GetAll Sales Model', () => {
  describe('Retorna todos os produtos', () => {
    const mock = [[{ id: 1, name: 'xablau'}]];
    before(async () => {
      Sinon.stub(connection, 'execute').resolves(mock);
    })
    after(async () => {
      connection.execute.restore();
    })
    it('retorna um array', async function () {
      const resultado = await salesModel.getAll();
      expect(resultado).to.be.an('array');
    })
    it('retorna um array cheio', async function () {
      const resultado = await salesModel.getAll();
      expect(resultado).to.be.not.empty;
    })
  });
});