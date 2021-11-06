const { User } = require("../models/UserModel");
const nodemailer = require("nodemailer");
const { decryptData } = require("../util/validate");

exports.sendMail = (req, res, next) => {
  const { to, subject, body } = req.body;
  const error = {};
  if (to.trim().length === 0) {
    error.to = "To is required";
  }
  if (subject.trim().length == 0) {
    error.subject = "Suject is required";
  }
  if (body.trim().length == 0) {
    error.body = "Body is required";
  }

  if (error.to || error.body || error.subject) {
    const emptyError = new Error("Empty fields");
    emptyError.data = {
      ...error,
    };
    emptyError.status = 404;
    next(emptyError);
  }

  User.findOne({ email: req.email })
    .then(async (user) => {
      if (!user) {
        const userError = new Error("User not found");
        userError.data = {
          user: "User not found",
        };
        userError.status = 404;
        throw userError;
      }

      const indexOfAt = user.email.indexOf("@");
      const indexOfDot = user.email.slice(indexOfAt).indexOf(".") + indexOfAt;
      const service = user.email.slice(indexOfAt + 1, indexOfDot);

      const transporter = nodemailer.createTransport({
        service,
        auth: {
          user: user.email,
          pass: decryptData(user.password),
        },
      });

      var mailOptions = {
        from: user.email,
        to,
        subject,
        text: body,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (e) {
        const mailError = new Error("Receiver Email is Invalid");
        mailError.data = {
          to: "Receiver Email is Invalid",
        };
        mailError.status = 404;
        throw mailError;
      }
      console.log("Sent");
      res.status(200).json({
        message: "Mail sent Successfull",
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};
