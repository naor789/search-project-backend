const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    EmployeeFullName: {
        type: String,
        required: true,

    },
    EmployeeDetails: {
        type: [],
        EmployeeRole: { type: String, required: true, },
        ImageURL: { type: String, required: true, }
    },
    isFavorite: {
        type: Boolean,
        default: false
}
});

module.exports = mongoose.model('Employee', employeeSchema);
