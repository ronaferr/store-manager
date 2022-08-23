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
    if (!resultado) {
    return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById };