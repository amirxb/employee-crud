const { validationResult } = require('express-validator');

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({
    error: 'Validation error',
    details: errors.array().map(e => ({ field: e.param, msg: e.msg }))
  });
};