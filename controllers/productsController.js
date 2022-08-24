const productsService = require('../services/productsService');

const getAll = async (req, res) => {
  try {
    const resultado = await productsService.getAll();
    if (!resultado) {
      return res.status(404).json({ message: 'Algo deu errado' });
    }
    res.status(200).json(resultado);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await productsService.getById(id);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const product = await productsService.create({ name });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await productsService.getById(id);
    const product = await productsService.update({ name, id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

const exclude = async (req, res) => {
  try {
    const { id } = req.params;
    await productsService.getById(id);
    await productsService.exclude(id);
    res.status(204).end();
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create, update, exclude };