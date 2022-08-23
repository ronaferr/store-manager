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
describe('Insere um novo produto', () => {
  /* describe('quando o payload informado não é válido', () => {
    const payload = {};

    it('retorna um boolean', async () => {
      const response = await productsService.create(payload);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "false"', async () => {
      const response = await productsService.create(payload);

      expect(response).to.be.equal(false);
    });
  }); */
  describe('quando é inserido com sucesso', () => {
    const payload = {
      name: 'Batarangue',
    };

    before(() => {
      const EXAMPLE = {
        id: 10, name: 'Batarangue',
      };

      Sinon.stub(productsModel, 'create')
        .resolves(EXAMPLE);
    });

    after(() => {
      productsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.create(payload);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await productsService.create(payload);

      expect(response).to.have.a.property('id');
    });

  });
});