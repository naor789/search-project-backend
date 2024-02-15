const Employee = require('../model/EmployeeSchema')

const getOneEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        Employee.find({ _id: id }, (err, employee) => {
            if (err) {
                throw err;
            }
            res.status(200).json(employee)
        })
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

}

const searchEmployee = async (req, res) => {
    const { query } = req.query
    try {
        if (query !== '' && query?.length > 1) {
            Employee.find({ $or: [{ "EmployeeFullName": { $regex: query, $options: 'i' } }, { "EmployeeDetails": { $elemMatch: { "EmployeeRole": { $regex: query, $options: 'i' } } } }] }, (err, employee) => {
                if (err) {
                    throw err;
                }
                res.status(200).json(employee)
            })
        } else {
            Employee.find({}, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    res.status(200).json(result)
                }
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

};

const addEmployeeToFavorite = async (req, res) => {
    const { id, isFavorite } = req.body;
    Employee.find({ _id: id }, (err, employee) => {
        if (err) {
            throw err;
        }
        Employee.findByIdAndUpdate({ _id: id }, { $set: { isFavorite: isFavorite } }, { new: true },
            (err, employee) => {
                if (err) {
                    return res.status(400).json(err)
                }
                res.json(employee);
            });
    })
}

const createEmployee = async (request, response) => {
    const employee = new Employee(request.body);
    try {
        await employee.save();
        response.send(employee);
    } catch (error) {
        response.status(500).send(error);
    }
};


module.exports = { searchEmployee, createEmployee, getOneEmployee, addEmployeeToFavorite }