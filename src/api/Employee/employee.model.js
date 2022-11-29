const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  EmpID: {
    type: Number,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  DeptID: {
    type: Number,
    required: true,
  },
  AssestID: {
    type: Number,
    required: true,
  },
});

const EmployeeModel = new mongoose.model("Employees", employeeSchema);

module.exports = EmployeeModel;
