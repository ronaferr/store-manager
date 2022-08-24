const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesControllers');
const validation = require('./middlewares/error');

const app = express();

app.use(bodyParser.json());

// const routes = require('./routes/index');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', validation.valid, productsController.create);
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);
app.put('/products/:id', validation.valid, productsController.update);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;