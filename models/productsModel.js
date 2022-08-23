const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products Where id = ?;',
    [id]);
  if (!result.length) return null;
  console.log(result);
  return result[0];
};

module.exports = { getAll, getById };