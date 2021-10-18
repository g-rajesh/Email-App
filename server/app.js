const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

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
app.post("/add/user", async (req, res) => {
  const hashedPass = await bcrypt.hash(req.body.password, 12);

  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPass,
  };

  const newUser = await new User(userData);
  await newUser.save();

  console.log(newUser);

  return res.status(200).json({
    message: "Account created successsfully",
    body: {
      fullName: newUser.firstName + " " + newUser.lastName,
      email: newUser.email,
    },
  });
});

// signin
app.post("/authenticate/user", async (req, res) => {
  const { email, password } = req.body;
  // let found = false;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  const isEqual = await bcrypt.compare(password, user.password);
  console.log(isEqual);

  if (!isEqual) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  return res.status(200).json({
    message: "Logged in",
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
