const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
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
  return result;
};

/* const create = async ({ name }) => {
  const [result] = await connection
    .execute(
      'INSERT INTO StoreManager.products (name) VALUES (?)',
      [name],
    );
  return {
    id: result.insertId,
    name,
  };
}; */

module.exports = { getAll, getById };