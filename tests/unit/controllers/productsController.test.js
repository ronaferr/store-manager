const { expect } = require("chai");
const { describe } = require("mocha");
const Sinon = require("sinon");

const productsService = require('../../../services/productsService');
const productsControler = require('../../../controllers/productsController');

describe('TESTANDO GetAll Controller', () => {
  describe('Caso de erro', () => {
    const response = {};
    const request = {};

    before(() => {
      Sinon.stub(productsService, 'getAll').resolves(undefined);
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
    })
    after(() => {
      productsService.getAll.restore();
    })
    it('é chamado o status com o código 404', async () => {
      await productsControler.getAll(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('é chamado o send com a mensagem "Algo deu errado"', async () => {
      const msgErro = { message: 'Algo deu errado' };
      await productsControler.getAll(request, response);

      expect(response.json.calledWith(msgErro)).to.be.equal(true);
    });
  });
  describe('Caso ok', () => {
    const request = {};
    const response = {};
    before(() => {
      const resultExecute = [];
      Sinon.stub(productsService, 'getAll').resolves(resultExecute);
      response.status = Sinon.stub().returns(response);
      response.json = Sinon.stub().returns();
    })
    after(() => {
      productsService.getAll.restore();
    })
    it('retorna array', async function () {
      await productsControler.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith([])).to.be.equal(true);
    })
  });
});
/* describe('GET BY ID CONTROLLER', async () => {
  describe('Caso de erro', () => {
    const request = {};
    const response = {};
    before(() => {
      request.params = {
        id: 99,
      };

      response.status = Sinon.stub()
        .returns(response);
      response.json = Sinon.stub()
        .returns();
      
      Sinon.stub(productsService, 'getById').resolves(null);
    })
    after(() => {
      productsService.getById.restore();
    })
    it('é chamado o status com o código 404', async () => {
      await productsControler.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('é chamado o send com a mensagem "Product not found"', async () => {
      const mesageError = { message: 'Product not found' };
      await productsControler.getById(request, response);

      expect(response.json.calledWith(mesageError)).to.be.equal;
    });
  });
  describe('Caso de sucesso', async () => {
    const response = {};
    const request = {};
    before(() => {
      Sinon.stub(productsService, 'getById').resolves({ id: 1, name: 'Martelo de Thor' });

      request.params = {
        id: 1,
      };

      response.status = Sinon.stub()
        .returns(response);
      response.json = Sinon.stub()
        .returns();
      
      
    });
    after(() => {
      productsService.getById.restore();
    });
    it('retorna array', async () => {
      await productsControler.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(Sinon.match.object)).to.be.equal(true);
    });
  });
}); */
/* describe('TESTANDO CREATE', () => {
  describe('quando o produto não é valido', () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = {};
      const execute = {};

      response.status = Sinon.stub()
        .returns(response);
      response.send = Sinon.stub()
        .returns();

      Sinon.stub(productsService, 'create').resolves(execute);
    })
    after(() => {
      productsService.create.restore();
    });
    it('retorne codigo 400', async () => {
      await productsService.create(request, response);
      expect(response.status.calledWith(400)).to.be.equal(true);
    });
    it('sem o campo nome', async () => {
      await productsService.create(request, response);
      expect(response.send.calledWith("'name' is required")).to.be.equal(true);
    });
    it('nome menor que 5 caracteres', async () => {
      await productsService.create(request, response);
      expect(response.send.calledWith("'name' length must be at least 5 characters long")).to.be.equal(true);
    });
  });
  describe('quando o produto é cadastrado', () => {
    const request = {};
    const response = {};
    before(() => {
      request.body = { name: 'batarangue do Batman'};

      response.status = Sinon.stub()
        .returns(response);
      response.json = Sinon.stub()
        .returns();

      Sinon.stub(productsService, 'create').resolves(true);
    })
    after(() => {
      productsService.create.restore();
    });
    it('retorne codigo 201', async () => {
      await productsService.create(request, response);
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('retorne objeto', async () => {
      await productsService.create(request, response);
      expect(response).to.have.a.property('name');
    });
  })
}); */
