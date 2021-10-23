const bcrypt = require("bcryptjs");

const { User } = require("../models/UserModel");

exports.signup = async (req, res, next) => {
    const hashedPass = await bcrypt.hash(req.body.password, 12);
  
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPass,
    };
  
    try {
        const newUser = await new User(userData);
        await newUser.save();

        return res.status(200).json({
            message: "Account created successsfully",
            body: {
              fullName: newUser.firstName + " " + newUser.lastName,
              email: newUser.email,
            },
        });

    } catch(err) {
        const error = new Error("Creating User failed!");
        error.status = 400;
        next(error);
    }
    
}

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("User not found");
            error.data = {
                email: "User not found!"
            }
            error.status = 404;

            throw error;
        }
    
        const isEqual = await bcrypt.compare(password, user.password);
    
        if (!isEqual) {
            const error = new Error("Password doesn't match");
            error.data = {
                password: "Password doesn't match"
            }
            error.status = 404;

            throw error;

        }
    
        return res.status(200).json({
            message: "Logged in",   
        });

    } catch(err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
    
}