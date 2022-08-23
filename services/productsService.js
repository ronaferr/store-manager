const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const productData = productsModel.getById(id);

  if (!productData) return null;
  return productData;
};

module.exports = { getAll, getById };