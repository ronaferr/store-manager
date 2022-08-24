const salesModel = require('../models/salesModel');
const productServices = require('./productsService');

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const saleData = await salesModel.getById(id);

  if (saleData.length === 0) return null;
  return saleData;
};

const create = async (array) => {
  await Promise.all(array.map((obj) => productServices.getById(obj.productId)));
  const newSaleData = await salesModel.create(array);

  return newSaleData;
};

module.exports = { getAll, getById, create };