const Joi = require('joi');

const valid = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

const validSale = async (req, res, next) => {
  const schema = Joi.array().items(Joi.object({
    productId: Joi.number().required().messages({
      'any.required': '400|"productId" is required',
    }),
    quantity: Joi.number().min(1).required().messages({
      'any.required': '400|"quantity" is required',
      'number.min': '422|"quantity" must be greater than or equal to {#limit}',
    }),
  }));
  const { error } = schema.validate(req.body);
  if (error) {
    const [status, message] = error.message.split('|');
    return res.status(Number(status)).json({ message });
  }
  next();
};

module.exports = { valid, validSale };