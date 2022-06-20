const services = require("../services")
const moment = require("moment");


exports.user_signup = async (req, res, next) => {
    try{
        const { firstName, otherName, email, phone, password, comfirmPassword} = req.body
        const { success, status = 200, message, data } = await new services.Onboard()
        .user_signup(firstName, otherName,email,phone, password, comfirmPassword)
        return res.status(status).json({ status: success ? "success" : "error", message, data }) 
    }catch(error){
        next(error)
    }   
}

exports.verifyUser = async (req, res, next) => {

    try{
        const token = req.params.token
        const { success, status = 200, message, data } = await new services.Onboard()
        .verifyUser(token)
        return res.status(status).json({ status: success ? "success" : "error", message, data }) 
    }catch(error){
        next(error)
    }   
    
}


exports.update_user = async (req, res, next) => {
    try{
        const { firstName, otherName, email, phone, password, comfirmPassword} = req.body
        const { success, status = 200, message, data } = await new services.Onboard().update_user(firstName, otherName, email, phone, password, comfirmPassword)
        return res.status(status).json({ status: success ? "success" : "error", message, data }) 
  
    }catch(error){
        next(error)
    }   
}

exports.delete_user = async (req, res, next) => {
    try{
        const id = req.params.id
        const { success, status = 200, message, data } = await new services.Onboard().delete_user(id)
        return res.status(status).json({ status: success ? "success" : "error", message, data }) 
  
    }catch(error){
        next(error)
    }   
}
