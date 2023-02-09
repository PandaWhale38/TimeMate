const express = require('express');
const router = express.Router();
const employeesMiddle = require('../middleware/employeesMiddle.js');
const getLocationData = require('../controllers/dataController.js');
//location revenue

//location budget
router.post(
  '/',
  employeesMiddle.getAll,
  getLocationData.getData,
  (req, res) => {
    res.status(201).json(res.locals.locationData);
  }
);
//

module.exports = router;
