const productsService = require('../services/productsService');
const productsModel = require('../models/productsModel');

const getAll = async (req, res) => {
  try {
    const resultado = await productsService.getAll();
    return res.status(200).json(resultado);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await productsModel.getById(id);
    if (!resultado) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(resultado);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Product not found' });
  }
};

module.exports = { getAll, getById };