const express = require('express');
const utils = require('../../util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const Errors = require("./Errors");


class Auth {
   


    async login(email, password){
      
        if (!utils.isEmpty(password)) return { success: false, status: 409, message: 'Password cannot be empty' }
        if (!utils.isEmpty(email)) return { success: false, status: 409, message: 'Email cannot be empty ' }
        if(!utils.isEmail(email)) return { success: false, status: 409, message: 'Invalid email address ' }
        const user = await models.User.query().findOne({ email })
        if(user.activation !== 1) return { success: false, status: 409, message:'please verify your account '}
        const match = await bcrypt.compare(password, user.password);
        if(match) {
            const token =  jwt.sign({email: user.email,c_kyc: user.c_kyc},process.env.JWT_KEY,{expiresIn: "1h"})
                return {
                    success: true,
                    status: 200,
                    message: 'Successfully logged In',
                    data: {
                        email: user.email,
                        firstName: user.firstName,
                        otherName: user.otherName,
                        phone: user.phone,
                        c_kyc: user.c_kyc,
                        token: token
                        }
                    }
        }
        return {success: false,status: 409,message: 'Auth Failed',}
    }
}

module.exports = Auth