const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const productData = productsModel.getById(id);

  if (!productData) return null;
  return productData;
};

const create = async ({ name }) => {
  const result = await productsModel.create({ name });
  return result;
};

module.exports = { getAll, getById, create };