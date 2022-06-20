const services = require("../services")
const moment = require("moment");


exports.login = async (req, res, next) => {
  try{
      const { email, password} = req.body
      const { success, status = 200, message, data } = await new services.Auth().login(email, password)
      return res.status(status).json({ status: success ? "success" : "error", message, data }) 

  }catch(error){
      next(error)
  }   
}

