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

const validateEmail = (email) => {
    console.log(email);
    return email.trim().includes("@");
};



module.exports = { isEmpty, validateEmail }