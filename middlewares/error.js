const productsService = require('../services/productsService');

const valid = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validSale = (req, res, next) => {
  const ZERO = 0;
  const list = req.body;
  list.forEach(async (item) => {
    const haveAProduct = await productsService.getById(item.productId);
    if (!haveAProduct) return res.status(404).json({ message: 'Product not found' });
    if (!item.productId) return res.status(400).json({ message: '"productId" is required' });
    if (!item.quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (item.quantity <= ZERO) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  });
};

module.exports = { valid, validSale };