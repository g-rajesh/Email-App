const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated!");
    error.status = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "myConnectWebsiteSecretCode");
  } catch (err) {
    err.status = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated!");
    error.status = 401;
    throw error;
  }

  req.email = decodedToken.email;

  next();
};
