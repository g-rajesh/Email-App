const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/user");
const mailRoutes = require("./routes/mail");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);

app.use("/mail", mailRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message, data });
});

const mongoDB =
  "mongodb+srv://Admin:admin123@cluster0.ulgdx.mongodb.net/Mailer?retryWrites=true&w=majority";
mongoose.connect(mongoDB).then(() => {
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
    console.log("Successfully Connected to MongoDB");
  });
});
