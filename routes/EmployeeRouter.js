const express = require('express')
const router = express.Router()
const { searchEmployee, createEmployee, getOneEmployee, addEmployeeToFavorite } = require('../controllers/Employees')

router.get('/', searchEmployee)
router.get('/:id', getOneEmployee)
router.post('/', createEmployee)
router.post('/isFavorite', addEmployeeToFavorite)

module.exports = router