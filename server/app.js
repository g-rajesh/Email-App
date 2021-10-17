const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { User } = require("./models/UserModel");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// signup

// working now
app.post("/add/user", (req, res) => {

  // hashedPass = await bcrypt.hash(password, 12)

  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    // need to be hashed
    password: req.body.password,
  };

  const newUser = new User(userData);
  newUser.save();

  return res.status(200).json({
      message:"Account created successsfully", 
      body: {
        fullName: userData.firstName + " " + userData.lastName,
        email: userData.email,
      }
  });
});

// signin
app.post("/authenticate/user", (req, res) => {
  const { email, password } = req.body;
  let found = false;
  User.find().then((users) => {
    users.forEach((user) => {
      // need to decrypt and check

      // bcrypt.compare(hashedPass, password); -> returns boolean

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

const mongoDB =
  "mongodb+srv://Admin:admin123@cluster0.ulgdx.mongodb.net/Mailer?retryWrites=true&w=majority";
  mongoose.connect(mongoDB).then(() => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Listening to PORT ${PORT}`);
      console.log("Successfully Connected to MongoDB");
    });
});