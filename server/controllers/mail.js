const { User } = require("../models/UserModel");
const nodemailer = require("nodemailer");
const { encryptData, decryptData } = require("../util/validate");
const {sort} = require("../util/sort");

const Imap = require("imap");
const { simpleParser } = require("mailparser");

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
        subject: "SentFromMailer"+encryptData(subject),
        text: encryptData(body),
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
        sent:true
      });
    })
    .catch((err) => {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    });
};

exports.getInbox = (req, res, next) => {

  User.findOne({email: req.email})
  .then((user) => {
    const imapConfig = {
      user: user.email,
      password: decryptData(user.password),
      host: "imap.gmail.com",
      port: 993,
      tls: true,
      tlsOptions: { servername: "imap.gmail.com" },
    };
  
    const imap = new Imap(imapConfig);
    const inbox = [];
  
    const searchCallBack = (err, results) => {
      const f = imap.fetch(results, { bodies: "" });
  
      f.on("message", (msg) => {
        msg.on("body", (stream) => {
          simpleParser(stream, async (err, parsed) => {
            const { from, subject, text, date } = parsed;
            if(subject.includes("SentFromMailer")){
              inbox.push({from,subject:subject.slice(14),text, date, sentFromMailer:true})
            }
            else
              inbox.push({ from, subject, text, date, sentFromMailer: false });
          });
        });
      });
  
      f.once("error", (ex) => {
        return Promise.reject(ex);
      });
  
      f.once("end", () => {
          console.log("Done fetching all messages!");
          imap.end();
        });
      };
  
      const openBoxCallback = () => {
        imap.search(["ALL", ["SINCE", new Date('11-08-2021')]], searchCallBack);
      };
  
      const onceCallback = () => {
        imap.openBox("INBOX", false, openBoxCallback);
      };
  
      try {
        imap.once("ready", onceCallback);
  
        imap.once("error", (err) => {
          console.log(err);
        });

        imap.once("end", () => {
          console.log("Connection ended");
          const sortedInbox = sort(inbox);
          res.status(200).json({
              data: sortedInbox
          });
        });
  
        imap.connect();
      } catch (err) {
        console.log(err);
        console.log("An error occurred");
      }
  })
  .catch(err => console.log(err));
}

exports.verifyPassword = (req, res, next) => {
  const { password } = req.body;
  console.log(req.body, 160);

  if(password.trim().length === 0) {
    const passwordError = new Error("Password must be 6 characters long");
    passwordError.status = 404;
    passwordError.data = { password: "Password must be 6 characters long" };
    next(passwordError);
  }

  User.findOne({email: req.email})
  .then(user => {
    if(decryptData(user.password) !== password) {
      const passwordError = new Error("Incorrect password");
      passwordError.status = 404;
      passwordError.data = { password: "Incorrect password" };
      throw passwordError;
    }

    return res.status(200).json({
      message: "Password is valid",
    });
    
  })
  .catch(err => {
    if(!err.status) err.status = 500;
    next(err);
  })
}
