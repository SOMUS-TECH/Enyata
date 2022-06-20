const crypto = require("crypto")
const nodemailer = require("nodemailer");

exports.cleanPhoneNumber = (phone = "") => {
  const ext = "234"
  if (phone.indexOf(ext) === 0 && phone.length > 11) {
    phone = phone.substr(ext.length);
  }
  if (phone.indexOf("0") === 0) phone = phone.substr(1);
  if (isNaN(Number(phone)) || phone.length !== 10) {
    return null;
  }
  return ext + phone;
}

exports.isEmpty = (field) => {
  if (field === "" || field === null) {
    return null;
  }
  return field;
}

exports.isEmail = (email) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}



exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log("Check");
  nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }).sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=https://bcnetworks.herokuapp.com/onboarding/verify/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
  return (true)
};


exports.generateReferralCode = (length = 6) => {
  length = Math.min(10, length);
  return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))
    .toString(36)
    .slice(1)
    .toUpperCase();
};

exports.generateReference = (pre = '', length = 13) => {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    pre += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return pre;
}

exports.generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[(Math.floor(Math.random() * digits.length))];
  }
  return otp;
}








