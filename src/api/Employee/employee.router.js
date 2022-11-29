const express = require("express");
const Employee = require("./employee.controller.js");

const router = express.Router();

router.get("/employee", Employee.getAllEmployees);
router.post("/employee", Employee.createEmployee);
router.get("/employee/:id", Employee.findEmployeeByID);
router.put("/employee/:id", Employee.updateEmployee);
router.delete("/employee/:id", Employee.deleteEmployee);

module.exports = router;
