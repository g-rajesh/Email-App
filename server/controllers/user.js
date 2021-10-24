const bcrypt = require("bcryptjs");
const axios = require("axios");
const nodemailer = require("nodemailer");

const { User } = require("../models/UserModel");
const { isEmpty, validateEmail } = require("../util/validate");

exports.signup = (req, res, next) => {
  const error = isEmpty(req.body, true);
  if (error.firstName || error.lastName || error.email || error.password) {
    const emptyError = new Error("Validation failed");
    console.log(error);
    emptyError.data = {};
    if (error.firstName) {
      emptyError.data.firstName = error.firstName;
    }
    if (error.lastName) {
      emptyError.data.lastName = error.lastName;
    }
    if (error.email) {
      emptyError.data.email = error.email;
    }
    if (error.password) {
      emptyError.data.password = error.password;
    }

    emptyError.status = 500;
    throw emptyError;
  }

  if (!validateEmail(req.body.email)) {
    const emailNotValidError = new Error("Email not valid");
    emailNotValidError.data = {
      email: "Enter a valid Email address",
    };
    emailNotValidError.status = 500;
    throw emailNotValidError;
  }
  const email = req.body.email;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        const emailAlreadyExistError = new Error("Email already exist");
        emailAlreadyExistError.data = {
          email: "Email already exist",
        };
        emailAlreadyExistError.status = 500;
        throw emailAlreadyExistError;
      }

      return axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=00483ffcf4b44beb9b6ec19bfc036590&email=${email}`
      );
    })
    .then(async (res) => {
      if (res.data.deliverability !== "DELIVERABLE") {
        const notDeliverableEmailError = new Error("Email is not deliverable");
        notDeliverableEmailError.data = {
          emailDeliverable: false,
        };
        notDeliverableEmailError.status = 404;
        throw notDeliverableEmailError;
      }

      // email sending starts here
      const indexOfAt = req.body.email.indexOf("@");
      const indexOfDot =
        req.body.email.slice(indexOfAt).indexOf(".") + indexOfAt;
      const service = req.body.email.slice(indexOfAt + 1, indexOfDot);

      const transporter = nodemailer.createTransport({
        service,
        auth: {
          user: req.body.email,
          pass: req.body.password,
        },
      });

      var mailOptions = {
        from: req.body.email,
        to: "batmanae2@gmail.com",
        subject: "Email validation test",
        text: "Email verification held successfully!",
      };

      try {
        await transporter.sendMail(mailOptions);
        return bcrypt.hash(req.body.password, 12);
      } catch (e) {
        const authenticationEmailError = new Error(
          "Either password is wrong or access denied"
        );
        authenticationEmailError.data = {
          passwordValidator: false,
          password: {
            message: "Either password is wrong or access denied",
          },
        };
        authenticationEmailError.status = 404;
        throw authenticationEmailError;
      }
    })
    .then((hashedPass) => {
      console.log(hashedPass);
      const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPass,
      };

      const newUser = new User(userData);
      return newUser.save();
    })
    .then((user) => {
      if (!user) {
        const error = new Error("Creating user failed");
        error.data = {
          error: "Creating user failed",
        };
        error.status = 404;

        throw error;
      }

      return res.status(200).json({
        message: "Account created successsfully",
        body: {
          fullName: user.firstName + " " + user.lastName,
          email: user.email,
        },
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.signin = async (req, res, next) => {
  const error = isEmpty(req.body, false);

  try {
    if (error.email || error.password) {
      const emptyError = new Error("Failed");
      console.log(92 + "here");
      emptyError.data = {};

      if (error.email) {
        emptyError.data.email = error.email;
      }
      if (error.password) {
        emptyError.data.password = error.password;
      }

      emptyError.status = 500;
      throw emptyError;
    }
  } catch (err) {
    next(err);
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.data = {
          email: "User not found!",
        };
        error.status = 404;

        throw error;
      }

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Invalid password");
        error.data = {
          password: "Invalid password",
        };
        error.status = 404;

        throw error;
      }

      return res.status(200).json({
        message: "Logged in",
        data: {
          email,
        },
      });
    })
    .catch((err) => {
      console.log("catched");
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
