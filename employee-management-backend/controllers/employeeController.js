const Employee = require('../models/employeeModel');


exports.addEmployee = async (req, res) => {
    try {
        const { name, position, email, phone, countryCode } = req.body;
        console.log(req.body);  // Debug log to check the incoming data
        const newEmployee = new Employee({ name, position, email, phone, countryCode });
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params; // Get the employee ID from the URL
        const { name, position, email, phone, countryCode } = req.body; // Ensure field names match the schema
        
        console.log(`Updating employee with ID: ${id}`); // Debugging log
        console.log(req.body); // Debugging log for request body
        
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, position, email, phone, countryCode },
            { new: true, runValidators: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// exports.updateEmployee = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, position, email, phone, countryCode } = req.body;
//         console.log(req.body);  // Debug log to check the incoming data
//         const employee = await Employee.findByIdAndUpdate(id, { name, position, email, phone, countryCode }, { new: true });
//         res.status(200).json(employee);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.status(200).json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
