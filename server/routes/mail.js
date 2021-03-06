const isAuth = require("../util/is-auth");
const express = require("express");

const router = express.Router();

const userController = require("../controllers/mail");

router.post("/send", isAuth, userController.sendMail);
router.get("/receive", isAuth, userController.getInbox);
router.post("/verifyPassword", isAuth, userController.verifyPassword);

module.exports = router;
