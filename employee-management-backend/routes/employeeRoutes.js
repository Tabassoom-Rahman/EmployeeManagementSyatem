const express = require('express');
const { addEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

const router = express.Router();

router.post('/employees', addEmployee); // Add an employee
router.get('/employees', getEmployees); // Get all employees
router.put('/employees/:id', updateEmployee); // Update employee
router.delete('/employees/:id', deleteEmployee); // Delete employee

module.exports = router;
