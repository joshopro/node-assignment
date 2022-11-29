const express = require("express");
const cors = require("cors");
require("./db/conn.js");
const dotenv = require("dotenv");
const employeeRouter = require("./api/Employee/employee.router.js");


dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api',employeeRouter);

module.exports.server = app.listen(port, () => {
  console.log(`Connection setup at port no: ${port}`);
});

module.exports.app = app;
