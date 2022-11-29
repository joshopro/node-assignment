const mongoose = require("mongoose");
const EmployeeModel = require("./employee.model.js");

class EmployeeService {
  async getAllEmployees() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await EmployeeModel.find();

        if (!response) {
          return reject({ message: "Employees not found", code: 404 });
        }

        resolve(response);
      } catch (err) {
        reject({ ...err, code: 400 });
      }
    });
  }

  async createEmployee(requestPayload) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!requestPayload) {
          reject({ message: "Invalid Document details", code: 400 });
        }

        const response = new EmployeeModel(requestPayload);
        const t = await response.save();
        resolve(t);
      } catch (err) {
        if (err.errors) {
          const k = Object.keys(err.errors);
          reject({ message: err.errors[k[0]].message, code: 400 });
        } else {
          reject({ ...err, code: 400 });
        }
      }
    });
  }

  async findEmployeeByID(_id) {
    if (!mongoose.isValidObjectId(_id)) {
      reject({ message: "Invalid id", code: 400 });
    }
    return await EmployeeModel.findOne({ _id });
  }

  async updateEmployee(_id, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!_id) {
          reject({ message: "Document Not Found", code: 404 });
        }
        if (!mongoose.isValidObjectId(_id)) {
          reject({ message: "Invalid id", code: 400 });
        }

        const response = await EmployeeModel.findByIdAndUpdate(_id, payload, {
          new: true,
        });

        resolve(response);
      } catch (err) {
        reject({ ...err, code: 400 });
      }
    });
  }

  async deleteEmployee(_id) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!_id) {
          reject({ message: "Document Not Found", code: 400 });
        }
        if (!mongoose.isValidObjectId(_id)) {
          reject({ message: "Invalid id", code: 400 });
        }

        const response = await EmployeeModel.deleteOne({ _id });

        resolve(response);
      } catch (err) {
        reject({ ...err, code: 400 });
      }
    });
  }
}

module.exports = new EmployeeService();
