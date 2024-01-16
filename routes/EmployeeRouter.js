const express = require('express')
const router = express.Router()
const { searchEmployee, createEmployee, getOneEmployee } = require('../controllers/Employees')

router.get('/', searchEmployee).get('/:id', getOneEmployee).post('/', createEmployee)


module.exports = router