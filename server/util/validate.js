// const fetch = require("node-fetch");

const { User } = require("../models/UserModel");

const isEmpty = (user, signup) => {
    const error = {}
    if(signup && user.firstName.trim().length === 0){
        error.firstName="First Name is required"
    }
    if(signup && user.lastName.trim().length === 0){
        error.lastName="Last Name is required"
    }
    if(user.email.trim().length === 0){ 
        error.email="Email is required"
    }
    if(user.password.trim().length < 6){
        error.password="Password must be atleast 6 characters long";
    }
    
    return error;
}

const validateEmail = (email) => email.trim().contains("@");

const isEmailAlreadyExist = (email)=>{
    User.findOne({email})
        .then(user=>{
            return user?true:false;
        })
}

// const isEmailValid = (email) => {
//     fetch("https://email-checker.p.rapidapi.com/verify/v1?email=batmanae2@gmail.com", {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": "email-checker.p.rapidapi.com",
//                 "x-rapidapi-key": "81b3ce736dmshe48e9549d29ddfap16bc2bjsnef50fd174fcf"
//             }
//         })
//         .then(response => {
//         console.log(response);
//         })
//         .catch(err => {
//         console.error(err);
//         });
// }

module.exports = { isEmpty, validateEmail, isEmailAlreadyExist }