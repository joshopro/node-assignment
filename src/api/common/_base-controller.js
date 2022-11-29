 class BaseController {
  response(res, data, statusCode, message) {
    let responseObject = {};
    if(data){
      responseObject.data = data;
    }
    responseObject.message = message || "";
    return res.status(statusCode).json(responseObject);
  }
}

module.exports = BaseController;
