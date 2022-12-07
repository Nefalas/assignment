import express from 'express';
import EmployeeController from '../controllers/EmployeeController.js';

const router = express.Router();

// Get a list of all Employees
router.get('/', EmployeeController.getAllEmployees);
// Create a new Employee
router.post('/', EmployeeController.createNewEmployee);
// Get details of an Employee
router.get('/:id', EmployeeController.getEmployeeDetails);
// Add vacations to Employee
router.post('/:id/vacations', EmployeeController.addVacationsToEmployee);
// Get Employees on vacation during period
router.get('/onVacation/:startDate/:endDate', EmployeeController.getEmployeesOnVacation)

export default router;