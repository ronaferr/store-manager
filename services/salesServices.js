const salesModel = require('../models/salesModel');

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const saleData = await salesModel.getById(id);

  if (saleData.length === 0) return null;
  return saleData;
};

const create = async (array) => {
  const newSaleData = await salesModel.create(array);

  return newSaleData;
};

module.exports = { getAll, getById, create };