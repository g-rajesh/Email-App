const bcrypt = require("bcryptjs");
const axios = require("axios");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const { User } = require("../models/UserModel");
const { encryptData, decryptData } = require("../util/validate");
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

      return user;

      // return axios.get(
      //   `https://emailverification.whoisxmlapi.com/api/v1?apiKey=at_mXyP5olRuik6WATLBAExOD9QwD7hu&emailAddress=${email}`
      // );
    })
    .then(async (res) => {
      // console.log(res.data.smtpCheck);
      // if (res.data.smtpCheck == "false") {
      //   console.log("here");
      //   const notDeliverableEmailError = new Error("Email is not deliverable");
      //   notDeliverableEmailError.data = {
      //     email: "Email is not deliverable",
      //   };
      //   notDeliverableEmailError.status = 404;
      //   throw notDeliverableEmailError;
      // }

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
        const hashedPass = encryptData(req.body.password);
        const userData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPass,
        };

        const newUser = new User(userData);
        return newUser.save();
      } catch (e) {
        const authenticationEmailError = new Error(
          "Either password is wrong or access denied"
        );
        authenticationEmailError.data = {
          password: "Either password is wrong or access denied",
          showModal: true,
        };
        authenticationEmailError.status = 404;
        throw authenticationEmailError;
      }
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

      const token = jwt.sign(
        { email: user.email },
        "myConnectWebsiteSecretCode",
        { expiresIn: "1h" }
      );

      //   decodedToken = jwt.verify(token, "myConnectWebsiteSecretCode");

      return res.status(200).json({
        message: "Account created successsfully",
        data: {
          email: user.email,
          token,
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

  let currUser;

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
          email: "User not found",
        };
        error.status = 404;

        throw error;
      }

      currUser = user;

      return password == decryptData(user.password);
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

      const token = jwt.sign(
        { email: currUser.email },
        "myConnectWebsiteSecretCode",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Logged in",
        data: {
          email,
          token,
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
