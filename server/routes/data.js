const express = require('express');
const router = express.Router();
const employeesMiddle = require('../middleware/employeesMiddle.js');
const getData = require('../controllers/dataController.js');
//location revenue

//location budget
router.post('/', employeesMiddle.getAll, getData.getData, (req, res) => {
  res.status(201).json(res.locals.locationData);
});
//

router.get('/getemployee/:id', getData.getEmployeeData, (req, res) => {
  res.status(200).json(res.locals.employeeData);
});

module.exports = router;
