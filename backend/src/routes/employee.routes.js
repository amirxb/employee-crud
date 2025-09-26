const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employee.controller');
const { validateEmployee, validateId } = require('../validators/employee.validator');
const { handleValidation } = require('../middleware/validateRequest');

router.get('/', EmployeeController.getAll);
router.get('/:id', validateId, handleValidation, EmployeeController.getById);
router.post('/', validateEmployee, handleValidation, EmployeeController.create);
router.put('/:id', validateId, validateEmployee, handleValidation, EmployeeController.update);
router.delete('/:id', validateId, handleValidation, EmployeeController.remove);
router.delete('/', EmployeeController.removeAll);

module.exports = router;