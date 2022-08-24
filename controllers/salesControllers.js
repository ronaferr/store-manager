const salesService = require('../services/salesServices');

const getAll = async (req, res) => {
  try {
    const resultado = await salesService.getAll();
    if (!resultado) {
      return res.status(404).json({ message: 'Sale not found' });
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
    const resultado = await salesService.getById(id);
    if (!resultado) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const create = async (req, res) => {
  try {
    const resultado = await salesService.create(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAll, getById, create };