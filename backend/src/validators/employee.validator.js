const { body, param } = require('express-validator');
const moment = require('moment');

/**
 * Validation rules that mirror requirements:
 * - firstname/lastname/dept: alphabetic only
 * - title: one of Mr, Miss, Mrs, Dr
 * - birthDate: >=1900-01-01 and age >= 18
 * - salary: number > 0
 * - email: basic format
 */

const nameAlpha = (value) => /^[A-Za-z]+$/.test(value);

const validateEmployee = [
  body('firstname')
    .exists().withMessage('firstname is required')
    .bail()
    .isString()
    .bail()
    .custom(nameAlpha).withMessage('firstname must be alphabetic only'),
  body('lastname')
    .exists().withMessage('lastname is required')
    .bail()
    .isString()
    .bail()
    .custom(nameAlpha).withMessage('lastname must be alphabetic only'),
  body('dept')
    .exists().withMessage('dept is required')
    .bail()
    .isString()
    .bail()
    .custom(nameAlpha).withMessage('dept must be alphabetic only'),
  body('title')
    .exists().withMessage('title is required')
    .bail()
    .isIn(['Mr', 'Miss', 'Mrs', 'Dr']).withMessage('title must be one of Mr, Miss, Mrs, Dr'),
  body('birthDate')
    .exists().withMessage('birthDate is required')
    .bail()
    .isISO8601().withMessage('birthDate must be a date in ISO format (YYYY-MM-DD)')
    .bail()
    .custom(value => {
      const minDate = moment('1900-01-01', 'YYYY-MM-DD');
      const birth = moment(value, 'YYYY-MM-DD');
      if (!birth.isValid()) throw new Error('Invalid date');
      if (birth.isBefore(minDate)) throw new Error('birthDate must be on or after 1900-01-01');
      const years = moment().diff(birth, 'years');
      if (years < 18) throw new Error('Employee must be at least 18 years old');
      return true;
    }),
  body('salary')
    .exists().withMessage('salary is required')
    .bail()
    .isFloat({ gt: 0 }).withMessage('salary must be a number greater than 0'),
  body('email')
    .exists().withMessage('email is required')
    .bail()
    .isEmail().withMessage('email must be a valid email address')
];

const validateId = [
  param('id').exists().withMessage('id is required').bail().isInt({ gt: 0 }).withMessage('id must be a positive integer')
];

module.exports = { validateEmployee, validateId };