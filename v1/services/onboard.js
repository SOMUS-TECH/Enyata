const express = require('express');
const utils = require('../../util');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');
const Errors = require("./Errors");


class Onboard {
    constructor(user) {
      this.user = user;
    }


    async user_signup(firstName, otherName,email,phone, password, comfirmPassword){

        const clean_phone = utils.cleanPhoneNumber(phone)
        if (!clean_phone) return { success: false, status: 409, message: 'Invalid phone number ' }
        if (!utils.isEmpty(firstName)) return { success: false, status: 409, message: 'First name cannot be empty' }
        if (!utils.isEmpty(otherName)) return { success: false, status: 409, message: 'Other name cannot be empty' }
        if (!utils.isEmpty(password)) return { success: false, status: 409, message: 'Password cannot be empty' }
        if(password !== comfirmPassword ) return { success: false, status: 409, message: 'Password Mistyped' }
        if (!utils.isEmpty(email)) return { success: false, status: 409, message: 'Email cannot be empty' }
        if(!utils.isEmail(email)) return { success: false, status: 409, message: 'Invalid email address' }
        // if (!clean_phone) throw new Errors.BadRequest('Invalid Phone number.')
        // if (!utils.isEmpty(firstName)) throw new Errors.BadRequest('First Name Cannot be Null')
        // if (!utils.isEmpty(otherName)) throw new Errors.BadRequest('Other Name Cannot be Null')
        // if (!utils.isEmpty(password)) throw new Errors.BadRequest('Password Cannot be Null')
        // if (!utils.isEmpty(email)) throw new Errors.BadRequest('Email Cannot be Null')
        // if(!utils.isEmail(email)) throw new Errors.BadRequest('Invalide Email Address')

        const user = await models.User.query().findOne({ email })
        if (user) return { success: false, status: 409, message: 'User exists. Please login.' }

        const token = jwt.sign({email: email}, process.env.JWT_KEY)

        await models.User.query().insert({
            phone: clean_phone,
            firstName: firstName,
            otherName: otherName,
            email:email,
            password: bcrypt.hashSync(password, 10),
            c_kyc: utils.generateReferralCode(),
            token: token
            
          });

          utils.sendConfirmationEmail(firstName,email,token)
          
          return {
            success: true,
            status: 201,
            message: 'Successfully created Account.'
          }
        
    }


    async update_user(firstName, otherName,email,phone, password, comfirmPassword){

      const clean_phone = utils.cleanPhoneNumber(phone)
      if (!clean_phone) return { success: false, status: 409, message: 'Invalid phone number ' }
      if (!utils.isEmpty(firstName)) return { success: false, status: 409, message: 'First name cannot be empty' }
      if (!utils.isEmpty(otherName)) return { success: false, status: 409, message: 'Other name cannot be empty' }
      if (!utils.isEmpty(password)) return { success: false, status: 409, message: 'Password cannot be empty' }
      if(password !== comfirmPassword ) return { success: false, status: 409, message: 'Password Mistyped' }
      if (!utils.isEmpty(email)) return { success: false, status: 409, message: 'Email cannot be empty' }
      if(!utils.isEmail(email)) return { success: false, status: 409, message: 'Invalid email address' }

    
      await models.User.query().patch({
          phone: clean_phone,
          firstName: firstName,
          otherName: otherName,
          password: bcrypt.hashSync(password, 10)
        }).where('email', email);
      
        return {
          success: true,
          status: 201,
          message: 'Successfully updated Account.'
        }
  }




  async delete_user(id){
    
      if (!utils.isEmpty(id)) throw new Errors.BadRequest('id Cannot be Null')
      
      await models.User.query().deleteById(id)
      
        return {
          success: true,
          status: 201,
          message: 'Successfully Deleted Product.'
        }
  }



    async verifyUser(token){

      const user = await models.User.query().findOne({ token }).patch({activation: 1});
      return {
        success: true,
        status: 200,
        message: 'Accout Verified successfully..'
      }

    }
    

}

module.exports = Onboard