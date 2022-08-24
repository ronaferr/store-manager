const productsModel = require('../models/productsModel');

const getAll = async () => productsModel.getAll();

const getById = async (id) => {
  const productData = await productsModel.getById(id);
  console.log(productData);
  if (!productData) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }
  return productData;
};

const create = async ({ name }) => {
  const result = await productsModel.create({ name });
  return result;
};

const update = async ({ name, id }) => {
  const result = await productsModel.update({ name, id });
  return result;
};

const exclude = async (id) => {
  await productsModel.exclude(id);
};

module.exports = { getAll, getById, create, update, exclude };