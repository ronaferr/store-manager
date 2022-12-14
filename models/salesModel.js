const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id AS saleId, s.date, sp.product_id As productId, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id;`;
  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?;`;
  const [result] = await connection.execute(query, [id]);
  const serialize = (authorData) => authorData.map((item) => ({
    date: item.date,
    productId: item.product_id,
    quantity: item.quantity,
  }));
  return serialize(result);
};

const create = async (array) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (NOW());');
  const query = `INSERT INTO StoreManager.sales_products
  (sale_id, product_id, quantity) VALUES (?, ?, ?);`;

  await Promise.all(array.map((obj) => connection
    .execute(query, [
      insertId,
      obj.productId,
      obj.quantity,
    ])));
  return { id: insertId, itemsSold: array };
};

module.exports = { getAll, getById, create };