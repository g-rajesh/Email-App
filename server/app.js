const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");
const { User } = require("./models/UserModel");

const app = express();
const PORT = 3001;
const mongoDB =
  "mongodb+srv://Admin:admin123@cluster0.ulgdx.mongodb.net/Mailer?retryWrites=true&w=majority";
mongoose.connect(mongoDB).then(() => {
  app.listen(process.env.PORT || PORT, () =>
    console.log("Successfully Connected to MongoDB")
  );
});

app.use(express.urlencoded({ extended: true }));
app.use(Cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// signup
app.post("/add/user", (req, res) => {
  console.log("received");
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // need to be hashed
    password: req.body.password,
  };

  const newUser = new User(userData);
  newUser.save();
  res.redirect("http://localhost:3000/sign-in");
});

// signin
app.post("/authenticate/user", (req, res) => {
  const { email, password } = req.body;
  let found = false;
  User.find().then((users) => {
    users.forEach((user) => {
      // need to decrypt and check
      if (user.email === email && user.password === password) {
        found = true;
        res.redirect("http://localhost:3000/");
      }
    });
  });
});

app.use((req, res) => {
  res.send("404 Not Found");
});
