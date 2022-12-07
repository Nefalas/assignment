import EmployeeModel from '../models/Employee.js';
import VacationModel from '../models/Vacation.js';

export default class EmployeeController {

    /**
     * Queries the database for all the Employees and sends them as JSON
     * @param req the request object
     * @param res the response object
     */
    static getAllEmployees(req, res) {
        EmployeeModel.find()
            .then(allEmployees => {
                res.json(allEmployees);
            })
    }

    /**
     * Creates a new Employee, saves it to the database and sends it as JSON
     * @param req the request object
     * @param res the response object
     */
    static createNewEmployee(req, res) {
        const employee = new EmployeeModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });

        employee.save()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }

    /**
     * Queries the database for a single Employee specified by ID and for its Vacations and groups the Vacations into
     * past, present and future ones, then sends the Employee and Vacations as JSON
     * @param req the request object
     * @param res the response object
     */
    static getEmployeeDetails(req, res) {
        EmployeeModel.findById(req.params.id)
            .then(employee => {
                VacationModel.find({employee: req.params.id}).select('-employee')
                    .then(vacations => {
                        const now = Date.now();
                        let groupedVacations = {
                            past: vacations.filter(vacation => vacation.endDate < now),
                            present: vacations.filter(vacation => vacation.startDate <= now && vacation.endDate >= now),
                            future: vacations.filter(vacation => vacation.startDate > now)
                        }

                        let response = employee.toObject();
                        response.vacations = groupedVacations;

                        res.json(response);
                    })
                    .catch(err => res.json(err));
            })
            .catch(() => res.json({
                status: 'error',
                message: 'Employee not found'
            }));
    }

    /**
     * Creates a new Vacation for an Employee specified by ID, saves it to the database and sends it as JSON
     * @param req the request object
     * @param res the response object
     */
    static addVacationsToEmployee(req, res) {
        EmployeeModel.findById(req.params.id)
            .then(employee => {
                const employeeId = employee._id;
                const vacation = new VacationModel({
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    comment: req.body.comment,
                    employee: employeeId
                });

                vacation.save()
                    .then(data => res.json(data))
                    .catch(err => res.json(err));

            })
            .catch(() => res.json({
                status: 'error',
                message: 'Employee not found'
            }));
    }

    /**
     * Finds the list of Employees on vacation during the given period. Queries the database for Vacations that overlap
     * the given period, extracts the list of Employees and sends it as JSON
     * @param req the request object
     * @param res the response object
     */
    static getEmployeesOnVacation(req, res) {
        const periodStart = new Date(parseInt(req.params.startDate));
        const periodEnd = new Date(parseInt(req.params.endDate));
        VacationModel.aggregate([
            { $match: { $and: [{startDate: {$lt: periodEnd}}, {endDate: {$gt: periodStart}}] } },
            { $group: {  _id: '$employee' } }
        ])
            .then(vacations => EmployeeModel.populate(vacations, {path: '_id'}))
            .then(data => {
                const employees = data.map(d => d._id);
                res.json(employees)
            })
            .catch(err => res.json(err));
    }
}