const EmployeeService = require("./employee.service");
const BaseController = require("../common/_base-controller");

class Employee extends BaseController {
  constructor() {
    super();
  }

  async getAllEmployees(req, res) {
    try {
      const response = await EmployeeService.getAllEmployees();
      super.response(res, response, 200, "Successfully Fetched Records");
    } catch (err) {
      super.response(res, "", err.code, err.message);
    }
  }

  async createEmployee(req, res) {
    try {
      const response = await EmployeeService.createEmployee(req.body);
      super.response(res, response, 201, "Successfully Created Record");
    } catch (err) {
      super.response(res, "", err.code, err.message);
    }
  }

  async findEmployeeByID(req, res) {
    try {
      const response = await EmployeeService.findEmployeeByID(req.params.id);
      if(response) {
        super.response(res, response, 200, "Successfully Fetched Record");
      } else {
      super.response(res, "", 404, "Employee Not Found");
      }
    } catch (err) {
      super.response(res, "", err.code, err.message);
    }
  }

  async updateEmployee(req, res) {
    try {
      const response = await EmployeeService.updateEmployee(req.params.id, req.body);
      if(response) {
        super.response(res, response, 200, "Successfully Update Record");
      } else {
      super.response(res, "", 404, "Employee Not Found");
      }
    } catch (err) {
      super.response(res, "", err.code, err.message);
    }
  }

  async deleteEmployee(req, res) {
    try {
      const response = await EmployeeService.deleteEmployee(req.params.id);
      if(response.deletedCount) {
        super.response(res, response, 200, "Successfully Deleted Record");
      } else {
      super.response(res, "", 404, "Employee Not Found");
      }
    } catch (err) {
      super.response(res, "", err.code, err.message);
    }
  }
}

module.exports = new Employee();
